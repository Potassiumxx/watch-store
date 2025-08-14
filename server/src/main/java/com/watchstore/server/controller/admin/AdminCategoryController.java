package com.watchstore.server.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.category.CategoryRequest;
import com.watchstore.server.service.CategoryService;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {
  private final CategoryService categoryService;

  public AdminCategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @PostMapping("/add-category")
  @ResponseStatus(HttpStatus.CREATED)
  public String addCategory(@RequestBody CategoryRequest request) {
    categoryService.createCategory(request);
    return "Category created";
  }

  @PutMapping("/update-category/{id}")
  @ResponseStatus(HttpStatus.OK)
  public String updateCategory(@PathVariable("id") Long id, @RequestBody CategoryRequest request) {
    categoryService.updateCategory(id, request);
    return "Category updated";
  }

  @DeleteMapping("/delete-category/{id}")
  @ResponseStatus(HttpStatus.OK)
  public String deleteCategory(@PathVariable("id") Long id) {
    categoryService.deleteCategory(id);
    return "Category deleted";
  }
}
