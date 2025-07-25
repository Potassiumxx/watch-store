package com.watchstore.server.dto.auth;

public class UserDTO {
  private Long id;
  private String email;
  private String username;
  private String role;

  public UserDTO(Long id, String email, String username, String role) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.role = role;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getUsername() {
    return username;
  }

  public String getRole() {
    return role;
  }
}
