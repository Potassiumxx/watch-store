package com.watchstore.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.dto.response.FieldErrorResponse;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.exceptions.UnauthorisedException;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;

  public UserDTO login(LoginRequest loginRequest) {
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

    if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) {
      User user = userOptional.get();
      return (new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole()));
    }

    String message = "Invalid Email or passowrd";
    FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
    fieldErrorResponse.addError("email", message);
    fieldErrorResponse.addError("password", message);

    throw new UnauthorisedException(fieldErrorResponse);
  }

  public UserDTO register(RegisterRequest registerRequest) {
    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();
      fieldErrorResponse.addError("email", "Email is already registered");
      throw new UnauthorisedException(fieldErrorResponse);
    }

    User user = new User(registerRequest.getEmail(), registerRequest.getPassword(), registerRequest.getUsername(),
        "USER");

    userRepository.save(user);

    return new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole());
  }
}
