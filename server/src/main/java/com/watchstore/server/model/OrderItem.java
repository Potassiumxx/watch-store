package com.watchstore.server.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // FK to order
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonIgnore
  private Order order;

  // FK to product
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private Integer quantity;

  @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
  private BigDecimal unitPrice;

  public OrderItem() {
  }

  public OrderItem(Order order, Product product, Integer quantity, BigDecimal unitPrice) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public Long getId() {
    return id;
  }

  public Order getOrder() {
    return order;
  }

  public Product getProduct() {
    return product;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public BigDecimal getUnitPrice() {
    return unitPrice;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public void setUnitPrice(BigDecimal unitPrice) {
    this.unitPrice = unitPrice;
  }

}
