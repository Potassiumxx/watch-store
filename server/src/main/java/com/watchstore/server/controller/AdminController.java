package com.watchstore.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @PutMapping("/update-product/{id}")
  public ResponseEntity<Object> updateProduct(@PathVariable("id") Long productID,
      @ModelAttribute ProductRequest productRequest) {

    if (productRequest.getProductImage() == null || productRequest.getProductImage().isEmpty()) {
      System.out.println("No new image uploaded, use the existing one");
    } else {
      System.out.println("New image uploaded: " + productRequest.getProductImage().getOriginalFilename());
    }

    try {
      productService.updateProduct(productID, productRequest);
      return new ResponseEntity<>("Updated!", HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>("Could not update product", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/delete-product/{id}")
  public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
    try {
      productService.deleteProduct(id);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Failed to delete product");
    }
  }

}
