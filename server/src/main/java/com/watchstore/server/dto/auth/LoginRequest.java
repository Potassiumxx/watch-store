package com.watchstore.server.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
  @JsonProperty("loginEmail")
  private String email;

  @JsonProperty("loginPassword")
  private String password;

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
