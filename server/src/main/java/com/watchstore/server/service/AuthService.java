package com.watchstore.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.watchstore.server.dto.auth.LoginRequest;
import com.watchstore.server.dto.auth.RegisterRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;

  public UserDTO login(LoginRequest loginRequest) throws Exception {
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

    if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) {
      User user = userOptional.get();
      return (new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole()));
    }

    throw new Exception("Invalid email or password");
  }

  public UserDTO register(RegisterRequest registerRequest) throws Exception {
    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      throw new Exception("Email is already registered");
    }

    User user = new User(registerRequest.getEmail(), registerRequest.getPassword(), registerRequest.getUsername(),
        "USER");

    userRepository.save(user);

    return new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole());
  }
}
