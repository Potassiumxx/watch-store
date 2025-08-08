package com.watchstore.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.dto.auth.VerifySecurityCodeRequest;
import com.watchstore.server.service.AuthService;
import com.watchstore.server.util.AuthResponseUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private AuthService authService;

  // Login Route
  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
    UserDTO userDTO = authService.login(loginRequest);
    return ResponseEntity.ok(AuthResponseUtil.buildAuthResponse((userDTO)));
  }

  // Register Route
  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest) {
    UserDTO userDTO = authService.register(registerRequest);
    return new ResponseEntity<>(AuthResponseUtil.buildAuthResponse(userDTO), HttpStatus.CREATED);
  }

  @PostMapping("/verify/security-code")
  public ResponseEntity<Object> verifySecurityCode(@RequestBody VerifySecurityCodeRequest request) {
    authService.verifySecurityCode(request);
    return new ResponseEntity<>("Valid security", HttpStatus.OK);
  }
}
