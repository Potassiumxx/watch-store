package com.watchstore.server.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterRequest {
  @JsonProperty("registerUsername")
  private String username;

  @JsonProperty("registerEmail")
  private String email;

  @JsonProperty("registerPassword")
  private String password;

  @JsonProperty("securityCode")
  private String securityCode;

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getSecurityCode() {
    return securityCode;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setSecurityCode(String securityCode) {
    this.securityCode = securityCode;
  }
}
