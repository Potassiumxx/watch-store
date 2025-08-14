package com.watchstore.server.util;

import java.util.HashMap;
import java.util.Map;

import com.watchstore.server.dto.auth.UserDTO;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class AuthResponseUtil {
  public static final Map<String, Object> buildAuthResponse(UserDTO userDTO, HttpServletResponse response) {
    Cookie cookie = CookieUtil.createCookie(userDTO);
    response.addCookie(cookie);

    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("user", userDTO);

    return responseBody;
  }
}
