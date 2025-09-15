package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.modal.User.CardDetail;
import com.klef.fsd.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public User register(User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(User user) {
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setPhonenumber(user.getPhonenumber());
            existingUser.setHomeAirport(user.getHomeAirport());
            existingUser.setTravellers(user.getTravellers());
            existingUser.setPaymentMethods(user.getPaymentMethods());
            existingUser.setCardDetails(user.getCardDetails());
            existingUser.setNotificationsEnabled(user.isNotificationsEnabled());
            // Update password only if a new one is provided and it’s different
            String newPassword = user.getPassword();
            if (newPassword != null && !newPassword.trim().isEmpty() && 
                !passwordEncoder.matches(newPassword, existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(newPassword));
            }
            // Preserve profile picture if not provided
            if (user.getProfilePicture() != null) {
                existingUser.setProfilePicture(user.getProfilePicture());
            }
            return userRepository.save(existingUser);
        }
        throw new RuntimeException("User not found with email: " + user.getEmail());
    }

    public User updateProfilePicture(String email, MultipartFile file) throws IOException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setProfilePicture(file.getBytes());
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with email: " + email);
    }
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
    public User addCardDetail(String email, CardDetail cardDetail) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<CardDetail> cardDetails = user.getCardDetails() != null ? user.getCardDetails() : new ArrayList<>();
            cardDetails.add(cardDetail);
            user.setCardDetails(cardDetails);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with email: " + email);
    }
}