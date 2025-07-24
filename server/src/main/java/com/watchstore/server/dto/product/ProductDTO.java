package com.watchstore.server.dto.product;

import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;

public class ProductDTO {
  private long id;
  private String name;
  private double price;
  private String category;
  private String description;
  private String imagePath;
  private int quantity;

  public ProductDTO(Product product, Inventory inventory) {
    this.id = product.getId();
    this.name = product.getName();
    this.price = product.getPrice();
    this.category = product.getCategory();
    this.description = product.getDescription();
    this.imagePath = product.getImage();
    this.quantity = inventory.getQuantity();
  }

  public Long getID() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public double getPrice() {
    return this.price;
  }

  public String getCategory() {
    return this.category;
  }

  public String getDescription() {
    return this.description;
  }

  public String getImagePath() {
    return this.imagePath;
  }

  public int getQuantity() {
    return this.quantity;
  }

}
