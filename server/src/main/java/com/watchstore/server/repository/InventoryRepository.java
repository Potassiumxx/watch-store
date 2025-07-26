package com.watchstore.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
  Optional<Inventory> findByProduct(Product product);
}
