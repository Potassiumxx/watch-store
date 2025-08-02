package com.watchstore.server.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_category")
public class ProductCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String category_name;

  public ProductCategory() {
  };

  public ProductCategory(String categoryName) {
    this.category_name = categoryName;
  }

  public Long getId() {
    return id;
  }

  public String getCategoryName() {
    return category_name;
  }

  public void setCategoryName(String categoryName) {
    this.category_name = categoryName;
  }

}
