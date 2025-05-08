package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ========================
    // LOGIN METHOD
    // ========================
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    // ========================
    // REGISTER USER OR ADMIN
    // ========================
    public User register(User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ========================
    // FIND USER BY EMAIL
    // ========================
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ========================
    // UPDATE USER DETAILS
    // ========================
    public User updateUser(User user) {
        // Re-encode password if it has been changed
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            existingUser.setUsername(user.getUsername());
            existingUser.setPhonenumber(user.getPhonenumber());

            // Encode password only if it's different from the existing one
            if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userRepository.save(existingUser);
        }

        throw new RuntimeException("User not found");
    }
}
