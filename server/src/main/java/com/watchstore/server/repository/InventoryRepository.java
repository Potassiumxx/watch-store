package com.watchstore.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

}
