package com.watchstore.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.category.CategoryDTO;
import com.watchstore.server.dto.category.CategoryRequest;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.exceptions.ResourceNotFoundException;
import com.watchstore.server.model.Category;
import com.watchstore.server.repository.CategoryRepository;
import com.watchstore.server.repository.ProductRepository;

@Service
public class CategoryService {
  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private ProductRepository productRepository;

  public void createCategory(CategoryRequest categoryRequest) {
    if (categoryRepository.findByCategoryName(categoryRequest.getCategoryName().toLowerCase()).isPresent()) {
      throw new BadRequestException(categoryRequest.getCategoryName() + " already exists!");
    }

    Category category = new Category(categoryRequest.getCategoryName());

    categoryRepository.save(category);
  }

  public void updateCategory(Long id, CategoryRequest categoryRequest) {
    if (categoryRepository.findByCategoryName(categoryRequest.getCategoryName().toLowerCase()).isPresent()) {
      throw new BadRequestException(categoryRequest.getCategoryName() + " already exists!");
    }

    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

    category.setCategoryName(categoryRequest.getCategoryName());

    categoryRepository.save(category);
  }

  public void deleteCategory(Long id) {
    categoryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found! Nothing to delete."));

    long productCount = productRepository.countByCategoryId(id);
    if (productCount > 0) {
      throw new BadRequestException(
          "Cannot delete category. It is currently in use by " + productCount + "product(s).");
    }
    categoryRepository.deleteById(id);
  }

  public List<CategoryDTO> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories.stream()
        .map(category -> new CategoryDTO(category.getId(), category.getCategoryName(),
            productRepository.countByCategoryId(category.getId())))
        .toList();
  }
}
