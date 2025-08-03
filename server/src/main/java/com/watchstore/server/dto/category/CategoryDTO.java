package com.watchstore.server.dto.category;

import com.watchstore.server.model.Category;

public class CategoryDTO {
  private long id;
  private String categoryName;

  public CategoryDTO(Category category) {
    this.categoryName = category.getCategoryName();
  }

  public CategoryDTO(long id, String categoryName) {
    this.id = id;
    this.categoryName = categoryName;
  }

  public long getId() {
    return id;
  }

  public String getCategoryName() {
    return categoryName;
  }
}
