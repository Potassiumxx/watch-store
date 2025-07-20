package com.watchstore.server.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterRequest {
  @JsonProperty("registerUsername")
  private String username;

  @JsonProperty("registerEmail")
  private String email;

  @JsonProperty("registerPassword")
  private String password;

  // Getters and Setters
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
