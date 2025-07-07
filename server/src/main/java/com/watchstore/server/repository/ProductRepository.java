package com.watchstore.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Optional<Product>findByProductName(String name);
}
