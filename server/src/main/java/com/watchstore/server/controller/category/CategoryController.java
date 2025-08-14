package com.watchstore.server.controller.category;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
  @ResponseStatus(HttpStatus.OK)
  public List<CategoryDTO> getAllProductCategories() {
    return categoryService.getAllCategories();
  }
}
