package com.watchstore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.category.CategoryRequest;
import com.watchstore.server.model.ProductCategory;
import com.watchstore.server.repository.ProductCategoryRepository;

@Service
public class ProductCategoryService {
  @Autowired
  private ProductCategoryRepository categoryRepository;

  public String createCategory(CategoryRequest categoryRequest) throws Exception {
    if (categoryRepository.findByCategoryName(categoryRequest.getCategoryName().toLowerCase()).isPresent()) {
      throw new Exception(categoryRequest.getCategoryName() + "already exists!");
    }

    ProductCategory productCategory = new ProductCategory(categoryRequest.getCategoryName());

    categoryRepository.save(productCategory);

    return "Category added";
  }
}
