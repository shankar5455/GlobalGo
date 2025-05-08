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

    // ========================
    // LOGIN ENDPOINT
    // ========================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.login(user.getEmail(), user.getPassword());

        Map<String, Object> response = new HashMap<>();

        if (loggedInUser.isPresent()) {
            User u = loggedInUser.get();
            response.put("username", u.getUsername());
            response.put("email", u.getEmail());
            response.put("role", u.getRole());
            response.put("status", "success");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
        }

        return response;
    }

    // ========================
    // REGISTER USER (DEFAULT ROLE: USER)
    // ========================
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        user.setRole("USER");  // Set default role as USER
        userService.register(user);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "User registered successfully");

        return response;
    }

    // ========================
    // REGISTER ADMIN
    // ========================
    @PostMapping("/admin/register")
    public Map<String, String> registerAdmin(@RequestBody User user) {
        user.setRole("ADMIN");  // Forcefully set role as ADMIN
        userService.register(user);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Admin registered successfully");

        return response;
    }

    // ========================
    // GET USER BY EMAIL
    // ========================
    @GetMapping("/user/{email}")
    public Map<String, Object> getUserByEmail(@PathVariable String email) {
        Optional<User> userOpt = userService.findByEmail(email);

        Map<String, Object> response = new HashMap<>();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("phonenumber", user.getPhonenumber());
            response.put("status", "success");
        } else {
            response.put("status", "error");
            response.put("message", "User not found");
        }

        return response;
    }
    
 // ========================
 // UPDATE USER DETAILS
 // ========================
 @PutMapping("/update")
 public Map<String, String> updateUser(@RequestBody User updatedUser) {
     Map<String, String> response = new HashMap<>();

     Optional<User> existingUserOpt = userService.findByEmail(updatedUser.getEmail());

     if (existingUserOpt.isPresent()) {
         User existingUser = existingUserOpt.get();

         // Update only allowed fields
         existingUser.setUsername(updatedUser.getUsername());
         existingUser.setPhonenumber(updatedUser.getPhonenumber());
         existingUser.setPassword(updatedUser.getPassword());

         userService.updateUser(existingUser);

         response.put("status", "success");
         response.put("message", "User updated successfully");
     } else {
         response.put("status", "error");
         response.put("message", "User not found");
     }

     return response;
 }

 
}
