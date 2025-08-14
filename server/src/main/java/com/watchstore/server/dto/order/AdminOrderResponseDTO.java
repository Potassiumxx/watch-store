package com.watchstore.server.dto.order;

import com.watchstore.server.model.Order;

public class AdminOrderResponseDTO extends OrderResponseDTO {
  private String userEmail;

  public AdminOrderResponseDTO() {
  }

  public AdminOrderResponseDTO(Order order) {
    super(order);
    this.userEmail = (order.getUser() != null) ? order.getUser().getEmail() : "Guest";
  }

  public String getUserEmail() {
    return this.userEmail;
  }
}
