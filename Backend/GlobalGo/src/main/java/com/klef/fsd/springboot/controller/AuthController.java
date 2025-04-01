package com.klef.fsd.springboot.controller;

import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Login Endpoint
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.login(user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {
            User u = loggedInUser.get();

            // Create a JSON response with username and role
            Map<String, Object> response = new HashMap<>();
            response.put("username", u.getUsername());
            response.put("role", u.getRole());
            response.put("status", "success");

            return response;
        }

        // Return error if login fails
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", "error");
        errorResponse.put("message", "Invalid credentials");
        return errorResponse;
    }

    // Register User Endpoint (Default Role: USER)
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setRole("USER");  // Default role is USER
        userService.register(user);
        return "User registered successfully";
    }

    // Register Admin Endpoint
    @PostMapping("/admin/register")
    public String registerAdmin(@RequestBody User user) {
        user.setRole("ADMIN");  // Enforce ADMIN role for admin registration
        userService.register(user);
        return "Admin registered successfully";
    }
}
