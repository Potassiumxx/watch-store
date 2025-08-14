package com.watchstore.server.util;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import com.watchstore.server.dto.auth.UserDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTUtil {
  private static final String SECRET_KEY = System.getProperty("JWT_SECRET_KEY"); // Has to be at least 256 bits
  private static final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

  public static String generateTokenString(UserDTO userDTO) {
    return Jwts.builder()
        .setSubject(userDTO.getId().toString())
        .claim("username", userDTO.getUsername())
        .claim("email", userDTO.getEmail())
        .claim("role", userDTO.getRole())
        .setIssuedAt(new Date())
        .setExpiration(Date.from(Instant.now().plus(7, ChronoUnit.DAYS)))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public static boolean isTokenValid(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }

  public static UserDTO getUserFromToken(String token) {
    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    return new UserDTO(
        Long.parseLong(claims.getSubject()),
        claims.get("email", String.class),
        claims.get("username", String.class),
        claims.get("role", String.class));
  }
}
