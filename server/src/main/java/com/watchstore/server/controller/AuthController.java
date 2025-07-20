package com.watchstore.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.response.FieldErrorResponse;
import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;
import com.watchstore.server.util.AuthResponseUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private UserRepository userRepository;

  // Login Route
  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
    FieldErrorResponse errorResponse = new FieldErrorResponse();
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (user.getPassword().equals(loginRequest.getPassword())) {
        UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUsername());
        return ResponseEntity.ok(AuthResponseUtil.buildAuthResponse((userDTO)));
      }
    }

    errorResponse.addError("email", "Invalid Email or password");
    errorResponse.addError("password", "Invalid Email or password");
    return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
  }

  // Register Route
  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest) {
    FieldErrorResponse errorResponse = new FieldErrorResponse();

    System.out.println("Email: " + registerRequest.getEmail());
    System.out.println("Password: " + registerRequest.getPassword());
    System.out.println("Username: " + registerRequest.getUsername());

    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      errorResponse.addError("email", "Email already registered");
      return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    User newUser = new User(registerRequest.getEmail(), registerRequest.getPassword(), registerRequest.getUsername(),
        false);
    userRepository.save(newUser); // Save in database

    UserDTO userDTO = new UserDTO(newUser.getId(), newUser.getEmail(), newUser.getUsername());

    return new ResponseEntity<>(AuthResponseUtil.buildAuthResponse(userDTO), HttpStatus.CREATED);
  }
}
