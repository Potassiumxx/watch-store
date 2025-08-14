package com.watchstore.server.util;

import com.watchstore.server.dto.auth.UserDTO;

import jakarta.servlet.http.Cookie;

public class CookieUtil {
  private static String jwtToken;
  private static boolean allowSecureCookie = "true".equals(System.getProperty("SECURE_COOKIE"));

  public static Cookie createCookie(UserDTO userDTO) {
    jwtToken = JWTUtil.generateTokenString(userDTO);
    Cookie cookie = new Cookie("jwt", jwtToken);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setSecure(allowSecureCookie);
    cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
    return cookie;
  }
}
