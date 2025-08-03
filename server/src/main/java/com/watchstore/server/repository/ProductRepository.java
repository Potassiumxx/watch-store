package com.watchstore.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
  Optional<Product> findByName(String name);
}
