package com.watchstore.server.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.watchstore.server.dto.product.ProductRequest;
import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;
import com.watchstore.server.repository.InventoryRepository;
import com.watchstore.server.repository.ProductRepository;
import com.watchstore.server.service.ProductService;
import com.watchstore.server.util.FileStorageUtil;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private ProductService productService;

  @PostMapping("/add-product")
  public ResponseEntity<Object> addProduct(@ModelAttribute ProductRequest productRequest) {
    try {
      productService.createProductWithInventory(productRequest);
      return new ResponseEntity<>("Finished", HttpStatus.CREATED);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>("Something went wrong. Please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
