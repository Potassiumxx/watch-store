package com.watchstore.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.LoginRequest;
import com.watchstore.server.dto.RegisterRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Login Route
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Simulate login logic (this would be your service method in a real app)
        if ("testuser".equals(loginRequest.getEmail()) && "password".equals(loginRequest.getPassword())) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    // Register Route
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        // Simulate registration logic (save the user to DB in real app)
        // For now, just assume registration is always successful
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}
