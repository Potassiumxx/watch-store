package com.watchstore.server;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.LoginRequest;
import com.watchstore.server.dto.RegisterRequest;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    // Login Route
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
       Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            }
    }

        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    // Register Route
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Password: " + registerRequest.getPassword());
        System.out.println("Username: " + registerRequest.getUsername());
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email already registered", HttpStatus.BAD_REQUEST);
        }

        User newUser = new User(registerRequest.getEmail(), registerRequest.getPassword(), registerRequest.getUsername());
        userRepository.save(newUser);
        return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
    }
}
