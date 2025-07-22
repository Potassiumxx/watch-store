package com.watchstore.server.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

  public void createProductWithInventory(ProductRequest productRequest) throws Exception {
    String uploadDirectory = "/home/asus/Pictures";
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
}
