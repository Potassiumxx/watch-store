package com.watchstore.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.product.ProductRequest;
import com.watchstore.server.service.ProductService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  @Autowired
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
