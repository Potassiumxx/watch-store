package com.watchstore.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // disable CSRF for testing
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/admin/**").permitAll()
            .requestMatchers("/api/products", "/api/products/**").permitAll()
            .requestMatchers("/api/product-category").permitAll()
            .requestMatchers("/images/**").permitAll()
            .requestMatchers("/api/checkout").permitAll()
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults()); // optional: enable basic auth if needed

    return http.build();
  }
}
