package com.watchstore.server.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.ResetPasswordRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.dto.auth.VerifySecurityCodeRequest;
import com.watchstore.server.service.AuthService;
import com.watchstore.server.util.AuthResponseUtil;
import com.watchstore.server.util.CookieUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
    UserDTO userDTO = authService.login(loginRequest);
    return ResponseEntity.ok(AuthResponseUtil.buildAuthResponse(userDTO, response));
  }

  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
    UserDTO userDTO = authService.register(registerRequest);
    return new ResponseEntity<>(AuthResponseUtil.buildAuthResponse(userDTO, response), HttpStatus.CREATED);
  }

  @PostMapping("/verify/security-code")
  public ResponseEntity<Object> verifySecurityCode(@RequestBody VerifySecurityCodeRequest request) {
    authService.verifySecurityCode(request);
    return new ResponseEntity<>("Valid security", HttpStatus.OK);
  }

  @PutMapping("/reset-password")
  public ResponseEntity<Object> resetPassword(@RequestBody ResetPasswordRequest request, HttpServletResponse response) {
    UserDTO userDTO = authService.resetPassword(request);
    return ResponseEntity.ok(AuthResponseUtil.buildAuthResponse(userDTO, response));
  }

  @GetMapping("/verify/cookie-token")
  public ResponseEntity<UserDTO> verifyCookieToken(HttpServletRequest request) {
    return CookieUtil.getUserFromRequest(request)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }

  @PostMapping("/logout")
  public ResponseEntity<Object> logout(HttpServletResponse response) {
    Cookie cookie = CookieUtil.deleteCookie();
    response.addCookie(cookie);
    return new ResponseEntity<>("Logged out", HttpStatus.OK);
  }
}
