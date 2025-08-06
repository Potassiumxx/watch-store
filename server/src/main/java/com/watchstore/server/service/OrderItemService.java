package com.watchstore.server.service;

import org.springframework.stereotype.Service;

import com.watchstore.server.model.OrderItem;
import com.watchstore.server.repository.OrderItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

  private final OrderItemRepository orderItemRepository;

  public OrderItemService(OrderItemRepository orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  public List<OrderItem> getAllOrderItems() {
    return orderItemRepository.findAll();
  }

  public Optional<OrderItem> getOrderItemById(Long id) {
    return orderItemRepository.findById(id);
  }

  public OrderItem saveOrderItem(OrderItem orderItem) {
    return orderItemRepository.save(orderItem);
  }

  public void deleteOrderItem(Long id) {
    orderItemRepository.deleteById(id);
  }

  public List<OrderItem> getItemsByOrderId(Long orderId) {
    return orderItemRepository.findByOrderId(orderId);
  }
}
