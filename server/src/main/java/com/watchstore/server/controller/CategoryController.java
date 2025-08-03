package com.watchstore.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.category.CategoryDTO;
import com.watchstore.server.service.CategoryService;

@RestController
@RequestMapping("/api/product-category")
public class CategoryController {
  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public ResponseEntity<List<CategoryDTO>> getAllProductCategories() {
    return ResponseEntity.ok(categoryService.getAllCategories());
  }
}
