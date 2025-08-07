package com.watchstore.server.dto.order;

import java.util.List;

public class OrderRequestDTO {
  private Long userId;
  private String dropLocation;
  private String phoneNumber;
  private List<OrderItemDTO> items;

  public OrderRequestDTO() {
  }

  public OrderRequestDTO(Long userId, String dropLocation, String phoneNumber, List<OrderItemDTO> items) {
    this.userId = userId;
    this.dropLocation = dropLocation;
    this.phoneNumber = phoneNumber;
    this.items = items;
  }

  public Long getUserId() {
    return userId;
  }

  public String getDropLocation() {
    return dropLocation;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public List<OrderItemDTO> getItems() {
    return items;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public void setDropLocation(String dropLocation) {
    this.dropLocation = dropLocation;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setItems(List<OrderItemDTO> items) {
    this.items = items;
  }
}
