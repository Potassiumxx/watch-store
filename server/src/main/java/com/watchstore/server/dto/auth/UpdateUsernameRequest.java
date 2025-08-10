package com.watchstore.server.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateUsernameRequest {
  private String updatedUsername;
  @JsonProperty("userEmail")
  private String email;

  public UpdateUsernameRequest() {
  }

  public UpdateUsernameRequest(String updatedUsername, String userEmail) {
    this.updatedUsername = updatedUsername;
    this.email = userEmail;
  }

  public String getUpdatedUsername() {
    return this.updatedUsername;
  }

  public String getEmail() {
    return this.email;
  }

}
