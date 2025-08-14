package com.watchstore.server.controller.auth;

import java.util.Arrays;
import java.util.Optional;

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
import com.watchstore.server.util.JWTUtil;

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
  public ResponseEntity<Object> verifyCookieToken(HttpServletRequest request) {
    String token = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
        .filter(c -> "jwt".equals(c.getName()))
        .findFirst()
        .map(Cookie::getValue)
        .orElse(null);

    if (token != null && JWTUtil.isTokenValid(token)) {
      UserDTO user = JWTUtil.getUserFromToken(token);
      return ResponseEntity.ok(user);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}
