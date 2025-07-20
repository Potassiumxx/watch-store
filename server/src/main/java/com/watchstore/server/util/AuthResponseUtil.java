package com.watchstore.server.util;

import java.util.HashMap;
import java.util.Map;

import com.watchstore.server.dto.auth.UserDTO;

public class AuthResponseUtil {
  public static final Map<String, Object> buildAuthResponse(UserDTO userDTO) {
    String jwtToken = JWTUtil.generateTokenString(userDTO);

    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("token", jwtToken);

    return responseBody;
  }
}
