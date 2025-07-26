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
import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;
import com.watchstore.server.repository.InventoryRepository;
import com.watchstore.server.repository.ProductRepository;
import com.watchstore.server.util.FileStorageUtil;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private InventoryRepository inventoryRepository;

  private final String uploadDirectory = "/home/asus/Pictures";

  public void createProductWithInventory(ProductRequest productRequest) throws Exception {
    MultipartFile file = productRequest.getProductImage();
    String randomFileName;

    try {
      randomFileName = FileStorageUtil.saveFile(file, uploadDirectory);
    } catch (IllegalStateException | IOException e) {
      e.printStackTrace();
      throw new IOException(e.getMessage());
    }

    Product product = new Product();
    product.setName(productRequest.getProductName());
    product.setPrice(productRequest.getProductPrice());
    product.setCategory(productRequest.getProductCategory());
    product.setDescription(productRequest.getProductDescription());
    product.setImage(randomFileName);

    Inventory inventory = new Inventory();
    inventory.setQuantity(productRequest.getProductQuantity());
    inventory.setProduct(product);

    productRepository.save(product);
    inventoryRepository.save(inventory);
  }

  public void updateProduct(Long id, ProductRequest request) throws IOException {
    Product existingProduct = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    MultipartFile file = request.getProductImage();
    String randomFileName;

    try {
      if (file != null && !file.isEmpty()) {
        FileStorageUtil.deleteFile(existingProduct.getImage(), uploadDirectory);
      }

      randomFileName = FileStorageUtil.saveFile(file, uploadDirectory);
    } catch (IllegalStateException | IOException e) {
      e.printStackTrace();
      throw new IOException(e.getMessage());
    }

    existingProduct.setName(request.getProductName());
    existingProduct.setCategory(request.getProductCategory());
    existingProduct.setDescription(request.getProductDescription());
    existingProduct.setPrice(request.getProductPrice());
    existingProduct.setImage(randomFileName);

    Inventory inventory = inventoryRepository.findByProduct(existingProduct)
        .orElseThrow(() -> new RuntimeException("Inventory not found"));

    inventory.setQuantity(request.getProductQuantity());
  }

  public List<ProductDTO> getAllProducts() {
    List<Product> products = productRepository.findAll();

    return products.stream().map(product -> {
      Optional<Inventory> inventoryOpt = inventoryRepository.findByProduct(product);
      Inventory inventory = inventoryOpt.orElse(null);
      return new ProductDTO(product, inventory);
    }).collect(Collectors.toList());
  }
}
