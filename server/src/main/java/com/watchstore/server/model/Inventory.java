package com.watchstore.server.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(nullable = false)
  private int quantity;

  @OneToOne
  @JoinColumn(name = "product_id", nullable = false, unique = true)
  private Product product;

  @Column(nullable = false, updatable = false)
  private LocalDate dateAdded;

  @Column(nullable = false)
  private LocalDate dateUpdated;

  public Inventory() {
    LocalDate now = LocalDate.now();
    this.dateAdded = now;
    this.dateUpdated = now;
  }

  @PreUpdate
  public void preUpdate() {
    this.dateUpdated = LocalDate.now();
  }

  public int getQuantity() {
    return quantity;
  }

  public LocalDate getDateAdded() {
    return dateAdded;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public void setProduct(Product product) {
    this.product = product;
  }
}
