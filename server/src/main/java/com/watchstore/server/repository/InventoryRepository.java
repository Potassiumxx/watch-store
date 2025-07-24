package com.watchstore.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
  Inventory findByProduct(Product product);
}
