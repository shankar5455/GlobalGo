package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();  // For password encryption

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Login Method with password verification
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        // Check if user exists and password matches
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    // Register User or Admin
    public User register(User user) {
        // Check if the role is provided, otherwise default to "USER"
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Encrypt the password before saving to the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user (either USER or ADMIN) to the database
        return userRepository.save(user);
    }
}
