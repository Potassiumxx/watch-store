package com.watchstore.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.category.CategoryDTO;
import com.watchstore.server.dto.category.CategoryRequest;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.model.Category;
import com.watchstore.server.repository.CategoryRepository;

@Service
public class CategoryService {
  @Autowired
  private CategoryRepository categoryRepository;

  public void createCategory(CategoryRequest categoryRequest) {
    if (categoryRepository.findByCategoryName(categoryRequest.getCategoryName().toLowerCase()).isPresent()) {
      throw new BadRequestException(categoryRequest.getCategoryName() + " already exists!");
    }

    Category category = new Category(categoryRequest.getCategoryName());

    categoryRepository.save(category);
  }

  public List<CategoryDTO> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories.stream().map(category -> new CategoryDTO(category.getId(), category.getCategoryName())).toList();
  }
}
