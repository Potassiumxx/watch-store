package com.watchstore.server.dto.category;

import com.watchstore.server.model.Category;

public class CategoryDTO {
  private long id;
  private String categoryName;
  private long productCount;

  public CategoryDTO(Category category) {
    this.categoryName = category.getCategoryName();
  }

  public CategoryDTO(long id, String categoryName, long productCount) {
    this.id = id;
    this.categoryName = categoryName;
    this.productCount = productCount;
  }

  public long getId() {
    return id;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public long getProductCount() {
    return productCount;
  }
}
