package com.watchstore.server.dto.order;

import java.math.BigDecimal;

import com.watchstore.server.model.OrderItem;

public class OrderItemDTO {
  private Long productId;
  private Integer quantity;
  private BigDecimal unitPrice;

  public OrderItemDTO() {
  }

  public OrderItemDTO(Long productId, Integer quantity, BigDecimal unitPrice) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public OrderItemDTO(OrderItem item) {
    this.productId = item.getProduct().getId();
    this.quantity = item.getQuantity();
    this.unitPrice = item.getUnitPrice();
  }

  public Long getProductId() {
    return productId;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public BigDecimal getUnitPrice() {
    return unitPrice;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public void setUnitPrice(BigDecimal unitPrice) {
    this.unitPrice = unitPrice;
  }
}
