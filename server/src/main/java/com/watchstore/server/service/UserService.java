package com.watchstore.server.service;

import org.springframework.stereotype.Service;

import com.watchstore.server.dto.auth.UpdateUsernameRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserDTO updateUsername(UpdateUsernameRequest request) {
    User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
        .orElseThrow(() -> new BadRequestException("Invalid Email. Someting went terribly wrong."));

    user.setUsername(request.getUpdatedUsername());
    userRepository.save(user);

    return new UserDTO(user.getId(), user.getEmail(), user.getUsername(), user.getRole());
  }
}
