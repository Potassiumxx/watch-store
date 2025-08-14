package com.watchstore.server.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.product.ProductRequest;
import com.watchstore.server.service.ProductService;

@RestController
@RequestMapping("/api/admin/product")
public class AdminProductController {
  private final ProductService productService;

  public AdminProductController(ProductService productService) {
    this.productService = productService;
  }

  @PostMapping("/add-product")
  @ResponseStatus(HttpStatus.CREATED)
  public String addProduct(@ModelAttribute ProductRequest request) {
    productService.createProductWithInventory(request);
    return "Product created";
  }

  @PutMapping("/update-product/{id}")
  @ResponseStatus(HttpStatus.OK)
  public String updateProduct(@PathVariable("id") Long productID,
      @ModelAttribute ProductRequest request) {
    productService.updateProduct(productID, request);
    return "Product updated";
  }

  @DeleteMapping("/delete-product/{id}")
  @ResponseStatus(HttpStatus.OK)
  public String deleteProduct(@PathVariable("id") Long productID) {
    return "product deleted";
  }
}
