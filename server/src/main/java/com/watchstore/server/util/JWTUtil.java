package com.watchstore.server.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import com.watchstore.server.dto.auth.UserDTO;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTUtil {

  public static String generateTokenString(UserDTO userDTO) {
    final String SECRET_KEY = System.getProperty("JWT_SECRET_KEY"); // Has to be at least 256 bits
    Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    return Jwts.builder()
        .setSubject(userDTO.getId().toString())
        .claim("username", userDTO.getUsername())
        .claim("email", userDTO.getEmail())
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }
}
