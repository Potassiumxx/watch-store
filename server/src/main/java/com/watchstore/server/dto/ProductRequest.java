package com.watchstore.server.dto;

public class ProductRequest {
    private String name;
    private double price;
    private String category;
    private String description;
    private String image;

    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getImage() { return image; }

    public void setName(String name) { this.name = name; }
    public void setPrice(double price) { this.price = price; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setImage(String image) { this.image = image; }
}
