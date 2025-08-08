package com.watchstore.server.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VerifySecurityCodeRequest {
  @JsonProperty("loginEmail")
  private String email;

  private String securityCode;

  public VerifySecurityCodeRequest() {
  }

  public VerifySecurityCodeRequest(String email, String securityCode) {
    this.email = email;
    this.securityCode = securityCode;
  }

  public String getEmail() {
    return email;
  }

  public String getSecurityCode() {
    return securityCode;
  }
}
