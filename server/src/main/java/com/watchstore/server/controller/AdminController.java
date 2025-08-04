package com.watchstore.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.category.CategoryRequest;
import com.watchstore.server.dto.product.ProductRequest;
import com.watchstore.server.service.CategoryService;
import com.watchstore.server.service.ProductService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  @Autowired
  private ProductService productService;
  @Autowired
  private CategoryService categoryService;

  @PostMapping("/add-product")
  public ResponseEntity<Object> addProduct(@ModelAttribute ProductRequest productRequest) {
    productService.createProductWithInventory(productRequest);
    return new ResponseEntity<>("Product created", HttpStatus.CREATED);
  }

  @PutMapping("/update-product/{id}")
  public ResponseEntity<Object> updateProduct(@PathVariable("id") Long productID,
      @ModelAttribute ProductRequest productRequest) {

    if (productRequest.getProductImage() == null || productRequest.getProductImage().isEmpty()) {
      System.out.println("No new image uploaded, use the existing one");
    } else {
      System.out.println("New image uploaded: " + productRequest.getProductImage().getOriginalFilename());
    }

    productService.updateProduct(productID, productRequest);
    return new ResponseEntity<>("Product updated!", HttpStatus.OK);
  }

  @DeleteMapping("/delete-product/{id}")
  public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @PostMapping("/add-category")
  public ResponseEntity<Object> addCategory(@RequestBody CategoryRequest categoryRequest) {
    categoryService.createCategory(categoryRequest);
    return new ResponseEntity<>("Category created", HttpStatus.CREATED);
  }

  @PutMapping("/update-category/{id}")
  public ResponseEntity<Object> updateCategory(@PathVariable long id, @RequestBody CategoryRequest categoryRequest) {
    categoryService.updateCategory(id, categoryRequest);
    return new ResponseEntity<>("Category updated", HttpStatus.OK);
  }

  @DeleteMapping("/delete-category/{id}")
  public ResponseEntity<Object> deleteCategory(@PathVariable long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
