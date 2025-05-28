package com.watchstore.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // allow all routes
                        .allowedOrigins("http://localhost:5173") // allow your frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // allow common HTTP methods
                        .allowedHeaders("*") // allow any headers
                        .allowCredentials(true); // allow cookies/auth
            }
        };
    }
}
