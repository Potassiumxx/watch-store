package com.watchstore.server.dto.product;

import org.springframework.web.multipart.MultipartFile;

public class ProductRequest {
  private String productName;
  private double productPrice;
  private String productCategory;
  private String productDescription;
  private int productQuantity;
  private MultipartFile productImage;

  public String getProductName() {
    return productName;
  }

  public double getProductPrice() {
    return productPrice;
  }

  public String getProductCategory() {
    return productCategory;
  }

  public String getProductDescription() {
    return productDescription;
  }

  public int getProductQuantity() {
    return productQuantity;
  }

  public MultipartFile getProductImage() {
    return productImage;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public void setProductPrice(double productPrice) {
    this.productPrice = productPrice;
  }

  public void setProductCategory(String productCategory) {
    this.productCategory = productCategory;
  }

  public void setProductDescription(String productDescription) {
    this.productDescription = productDescription;
  }

  public void setProductQuantity(int productQuantity) {
    this.productQuantity = productQuantity;
  }

  public void setProductImage(MultipartFile productImage) {
    this.productImage = productImage;
  }
}
