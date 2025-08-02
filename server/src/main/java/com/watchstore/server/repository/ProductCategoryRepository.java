package com.watchstore.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
  Optional<ProductCategory> findByCategoryName(String category);
}
