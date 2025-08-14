package com.watchstore.server.dto.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.watchstore.server.model.Order;

public class OrderResponseDTO {
  private long orderId;
  private String dropLocation;
  private String phoneNumber;
  private LocalDateTime createdAt;
  private List<OrderItemDTO> items;

  public OrderResponseDTO() {
  };

  public OrderResponseDTO(Order order) {
    this.orderId = order.getId();
    this.dropLocation = order.getDropLocation();
    this.phoneNumber = order.getPhoneNumber();
    this.createdAt = order.getCreatedAt();
    this.items = order.getItems().stream().map(OrderItemDTO::new).collect(Collectors.toList());
  }

  public long getOrderID() {
    return this.orderId;
  }

  public String getDropLocation() {
    return this.dropLocation;
  }

  public String getPhoneNumber() {
    return this.phoneNumber;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public List<OrderItemDTO> getOrderItems() {
    return this.items;
  }
}
