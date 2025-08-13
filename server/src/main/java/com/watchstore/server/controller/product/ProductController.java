package com.watchstore.server.controller.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.service.ProductService;
import com.watchstore.server.dto.product.ProductDTO;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<ProductDTO> getAllProducts() {
    return productService.getAllActiveProducts();
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public ProductDTO getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
  }
}
