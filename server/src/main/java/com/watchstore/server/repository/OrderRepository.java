package com.watchstore.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
