package com.watchstore.server.dto.category;

import com.watchstore.server.model.ProductCategory;

public class CategoryDTO {
  private String categoryName;

  public CategoryDTO(ProductCategory category) {
    this.categoryName = category.getCategoryName();
  }

  public String getCategoryName() {
    return categoryName;
  }
}
