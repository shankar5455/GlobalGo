package com.klef.fsd.springboot.controller;


import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.login(user.getEmail(), user.getPassword());
        if (loggedInUser.isPresent()) {
            User u = loggedInUser.get();
            return u.getRole().equals("ADMIN") ? "admin" : "user";
        }
        return "Invalid credentials";
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user);
        return "User registered successfully";
    }
}