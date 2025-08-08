package com.watchstore.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.dto.auth.VerifySecurityCodeRequest;
import com.watchstore.server.dto.response.FieldErrorResponse;
import com.watchstore.server.exceptions.AuthAPIException;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  public UserDTO login(LoginRequest loginRequest) {
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail().trim().toLowerCase());

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      boolean isValidPassword = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
      if (isValidPassword) {
        return (new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole()));
      }
    }

    String message = "Invalid Email or password";
    FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
    fieldErrorResponse.addError("email", message);
    fieldErrorResponse.addError("password", message);

    throw new AuthAPIException(fieldErrorResponse);
  }

  public UserDTO register(RegisterRequest registerRequest) {
    if (userRepository.findByEmail(registerRequest.getEmail().trim().toLowerCase()).isPresent()) {
      FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
      fieldErrorResponse.addError("email", "Email is already registered");
      throw new AuthAPIException(fieldErrorResponse, HttpStatus.CONFLICT);
    }

    String userRole = "USER";
    String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
    User user = new User(registerRequest.getEmail(), hashedPassword, registerRequest.getUsername(),
        userRole, registerRequest.getSecurityCode());

    userRepository.save(user);

    return new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole());
  }

  public void verifySecurityCode(VerifySecurityCodeRequest request) {
    String message = "Invalid Email or security code";
    User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> {
      FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
      fieldErrorResponse.addError("email", message);
      fieldErrorResponse.addError("securityCode", message);

      System.out.println("Wrong email");

      throw new AuthAPIException(fieldErrorResponse);
    });

    if (!user.getSecurityCode().equals(request.getSecurityCode())) {
      System.out.println("Wrong code");
      FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
      fieldErrorResponse.addError("email", message);
      fieldErrorResponse.addError("securityCode", message);
      throw new AuthAPIException(fieldErrorResponse);
    }
  }
}
