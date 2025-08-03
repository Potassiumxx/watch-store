package com.watchstore.server.service;

import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.watchstore.server.dto.product.ProductDTO;
import com.watchstore.server.dto.product.ProductRequest;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;
import com.watchstore.server.model.ProductCategory;
import com.watchstore.server.repository.InventoryRepository;
import com.watchstore.server.repository.ProductCategoryRepository;
import com.watchstore.server.repository.ProductRepository;
import com.watchstore.server.util.FileStorageUtil;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private InventoryRepository inventoryRepository;
  @Autowired
  private ProductCategoryRepository categoryRepository;

  private final String uploadDirectory = "/home/asus/Pictures";

  public void createProductWithInventory(ProductRequest productRequest) {
    MultipartFile file = productRequest.getProductImage();
    String randomFileName;

    try {
      randomFileName = FileStorageUtil.saveFile(file, uploadDirectory);
    } catch (IllegalStateException | IOException e) {
      throw new RuntimeException(e.getMessage());
    }

    ProductCategory category = categoryRepository
        .findByCategoryName(productRequest.getProductCategory().toLowerCase())
        .orElseThrow(() -> new BadRequestException("Category not found."));

    if (productRepository.findByName(productRequest.getProductName().toLowerCase()).isPresent()) {
      throw new BadRequestException(productRequest.getProductName() + " already exists!");
    }

    Product product = new Product();
    product.setName(productRequest.getProductName());
    product.setPrice(productRequest.getProductPrice());
    product.setCategory(category);
    product.setDescription(productRequest.getProductDescription());
    product.setImage(randomFileName);

    Inventory inventory = new Inventory();
    inventory.setQuantity(productRequest.getProductQuantity());
    inventory.setProduct(product);

    productRepository.save(product);
    inventoryRepository.save(inventory);
  }

  public void updateProduct(Long id, ProductRequest productRequest) {
    Product existingProduct = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    MultipartFile file = productRequest.getProductImage();
    String randomFileName;

    try {
      if (file != null && !file.isEmpty()) {
        FileStorageUtil.deleteFile(existingProduct.getImage(), uploadDirectory);
        randomFileName = FileStorageUtil.saveFile(file, uploadDirectory);
        existingProduct.setImage(randomFileName);
      }
    } catch (IllegalStateException | IOException e) {
      e.printStackTrace();
      throw new RuntimeException(e.getMessage());
    }

    ProductCategory category = new ProductCategory(productRequest.getProductCategory());

    existingProduct.setName(productRequest.getProductName());
    existingProduct.setCategory(category);
    existingProduct.setDescription(productRequest.getProductDescription());
    existingProduct.setPrice(productRequest.getProductPrice());

    Inventory inventory = inventoryRepository.findByProduct(existingProduct)
        .orElseThrow(() -> new RuntimeException("Inventory not found"));

    inventory.setQuantity(productRequest.getProductQuantity());

    productRepository.save(existingProduct);
    inventoryRepository.save(inventory);
  }

  public void deleteProduct(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found! How did you try to delete it?"));

    String imagePath = product.getImage();

    try {
      FileStorageUtil.deleteFile(imagePath, uploadDirectory);
    } catch (Exception e) {
      System.err.println("Failed to delete image file: " + imagePath);
    }

    productRepository.deleteById(id);
  }

  public List<ProductDTO> getAllProducts() {
    List<Product> products = productRepository.findAll();

    return products.stream().map(product -> {
      Optional<Inventory> inventoryOpt = inventoryRepository.findByProduct(product);
      Inventory inventory = inventoryOpt.orElse(null);
      return new ProductDTO(product, inventory);
    }).collect(Collectors.toList());
  }

  public ProductDTO getProductById(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

    Optional<Inventory> inventoryOpt = inventoryRepository.findByProduct(product);
    Inventory inventory = inventoryOpt.orElse(null);

    return new ProductDTO(product, inventory);
  }
}
