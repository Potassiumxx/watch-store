package com.watchstore.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.watchstore.server.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
  List<OrderItem> findByOrderId(Long orderId);

  boolean existsByProductId(long productId);
}
