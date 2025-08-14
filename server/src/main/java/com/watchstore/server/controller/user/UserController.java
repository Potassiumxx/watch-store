package com.watchstore.server.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.auth.UpdateUsernameRequest;
import com.watchstore.server.dto.auth.UserDTO;
import com.watchstore.server.service.UserService;
import com.watchstore.server.util.AuthResponseUtil;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PutMapping("/update-username")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<Object> updateUsername(UpdateUsernameRequest request, HttpServletResponse response) {
    UserDTO userDTO = userService.updateUsername(request);
    return ResponseEntity.ok(AuthResponseUtil.buildAuthResponse(userDTO, response));
  }
}
