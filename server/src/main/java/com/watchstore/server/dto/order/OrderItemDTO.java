package com.watchstore.server.dto.order;

import java.math.BigDecimal;

import com.watchstore.server.model.OrderItem;

public class OrderItemDTO {
  private Long productId;
  private Integer quantity;
  private BigDecimal unitPrice;
  private String productName;

  public OrderItemDTO() {
  }

  public OrderItemDTO(Long productId, Integer quantity, BigDecimal unitPrice, String productName) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.productName = productName;
  }

  public OrderItemDTO(OrderItem item) {
    this.productId = item.getProduct().getId();
    this.quantity = item.getQuantity();
    this.unitPrice = item.getUnitPrice();
    this.productName = item.getProduct().getName();
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

  public String getProductName() {
    return productName;
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

  public void setProductName(String productName) {
    this.productName = productName;
  }
}
