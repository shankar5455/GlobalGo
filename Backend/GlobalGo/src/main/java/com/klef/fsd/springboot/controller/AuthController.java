package com.klef.fsd.springboot.controller;

import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.modal.User.CardDetail;
import com.klef.fsd.springboot.repository.UserRepository;
import com.klef.fsd.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        logger.info("Login attempt for email: {}", email);

        Map<String, Object> response = new HashMap<>();
        if (email == null || password == null) {
            logger.warn("Missing email or password in login request");
            response.put("status", "error");
            response.put("message", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }
        
        
        Optional<User> loggedInUser = userService.login(email, password);
        if (loggedInUser.isPresent()) {
            User user = loggedInUser.get();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("token", user.getEmail()); // Replace with JWT in production
            response.put("status", "success");
            response.put("message", "Login successful");
            logger.info("Login successful for email: {}", email);
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
            logger.warn("Login failed for email: {}", email);
            return ResponseEntity.status(401).body(response);
        }
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
    }
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        logger.info("Registering user with email: {}", user.getEmail());
        Map<String, Object> response = new HashMap<>();
        try {
            if (user.getEmail() == null || user.getPassword() == null) {
                logger.warn("Missing email or password in registration request");
                response.put("status", "error");
                response.put("message", "Email and password are required");
                return ResponseEntity.badRequest().body(response);
            }
            user.setRole("USER");
            userService.register(user);
            response.put("status", "success");
            response.put("message", "User registered successfully");
            logger.info("User registered successfully with email: {}", user.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error registering user: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to register user: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody User user) {
        logger.info("Registering admin with email: {}", user.getEmail());
        Map<String, Object> response = new HashMap<>();
        try {
            if (user.getEmail() == null || user.getPassword() == null) {
                logger.warn("Missing email or password in admin registration request");
                response.put("status", "error");
                response.put("message", "Email and password are required");
                return ResponseEntity.badRequest().body(response);
            }
            user.setRole("ADMIN");
            userService.register(user);
            response.put("status", "success");
            response.put("message", "Admin registered successfully");
            logger.info("Admin registered successfully with email: {}", user.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error registering admin: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to register admin: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<Map<String, Object>> getUserByEmail(
            @PathVariable String email,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        logger.info("Fetching user with email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match requested email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match requested email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("role", user.getRole());
                response.put("phonenumber", user.getPhonenumber());
                response.put("homeAirport", user.getHomeAirport());
                response.put("travellers", user.getTravellers());
                response.put("paymentMethods", user.getPaymentMethods());
                response.put("cardDetails", user.getCardDetails());
                response.put("notificationsEnabled", user.isNotificationsEnabled());
                if (user.getProfilePicture() != null) {
                    response.put("profilePicture", java.util.Base64.getEncoder().encodeToString(user.getProfilePicture()));
                }
                response.put("status", "success");
                response.put("message", "User fetched successfully");
                logger.info("User fetched successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            logger.error("Error fetching user: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to fetch user: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateUser(
            @RequestBody User updatedUser,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        logger.info("Updating user with email: {}", updatedUser.getEmail());
        Map<String, Object> response = new HashMap<>();
        try {
            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(updatedUser.getEmail())) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, updatedUser.getEmail());
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> existingUserOpt = userService.findByEmail(updatedUser.getEmail());
            if (existingUserOpt.isPresent()) {
                User user = userService.updateUser(updatedUser);
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("role", user.getRole());
                response.put("phonenumber", user.getPhonenumber());
                response.put("homeAirport", user.getHomeAirport());
                response.put("travellers", user.getTravellers());
                response.put("paymentMethods", user.getPaymentMethods());
                response.put("cardDetails", user.getCardDetails());
                response.put("notificationsEnabled", user.isNotificationsEnabled());
                if (user.getProfilePicture() != null) {
                    response.put("profilePicture", java.util.Base64.getEncoder().encodeToString(user.getProfilePicture()));
                }
                response.put("status", "success");
                response.put("message", "User updated successfully");
                logger.info("User updated successfully for email: {}", updatedUser.getEmail());
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", updatedUser.getEmail());
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            logger.error("Error updating user: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update user: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PutMapping("/preferences")
    public ResponseEntity<Map<String, Object>> updatePreferences(
            @RequestBody Map<String, String> preferences,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = preferences.get("email");
        String homeAirport = preferences.get("homeAirport");
        logger.info("Updating preferences for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            if (email == null || homeAirport == null) {
                logger.warn("Missing email or homeAirport in preferences request");
                response.put("status", "error");
                response.put("message", "Email and homeAirport are required");
                return ResponseEntity.badRequest().body(response);
            }

            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setHomeAirport(homeAirport);
                userService.updateUser(user);
                response.put("status", "success");
                response.put("message", "Preferences updated successfully");
                logger.info("Preferences updated successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            logger.error("Error updating preferences: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update preferences: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PutMapping("/travellers")
    public ResponseEntity<Map<String, Object>> updateTravellers(
            @RequestBody Map<String, Object> travellersData,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = (String) travellersData.get("email");
        @SuppressWarnings("unchecked")
        List<String> travellers = (List<String>) travellersData.get("travellers");
        logger.info("Updating travellers for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            if (email == null || travellers == null) {
                logger.warn("Missing email or travellers in request");
                response.put("status", "error");
                response.put("message", "Email and travellers are required");
                return ResponseEntity.badRequest().body(response);
            }

            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setTravellers(travellers);
                userService.updateUser(user);
                response.put("status", "success");
                response.put("message", "Travellers updated successfully");
                logger.info("Travellers updated successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (ClassCastException e) {
            logger.error("Invalid travellers format: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Invalid travellers format: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            logger.error("Error updating travellers: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update travellers: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PutMapping("/payment-methods")
    public ResponseEntity<Map<String, Object>> updatePaymentMethods(
            @RequestBody Map<String, Object> paymentData,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = (String) paymentData.get("email");
        @SuppressWarnings("unchecked")
        List<String> paymentMethods = (List<String>) paymentData.get("paymentMethods");
        logger.info("Updating payment methods for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            if (email == null || paymentMethods == null) {
                logger.warn("Missing email or paymentMethods in request");
                response.put("status", "error");
                response.put("message", "Email and paymentMethods are required");
                return ResponseEntity.badRequest().body(response);
            }

            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setPaymentMethods(paymentMethods);
                userService.updateUser(user);
                response.put("status", "success");
                response.put("message", "Payment methods updated successfully");
                logger.info("Payment methods updated successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (ClassCastException e) {
            logger.error("Invalid paymentMethods format: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Invalid paymentMethods format: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            logger.error("Error updating payment methods: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update payment methods: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PutMapping("/notifications")
    public ResponseEntity<Map<String, Object>> updateNotifications(
            @RequestBody Map<String, Object> notificationData,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = (String) notificationData.get("email");
        Boolean notificationsEnabled = (Boolean) notificationData.get("notificationsEnabled");
        logger.info("Updating notifications for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            if (email == null || notificationsEnabled == null) {
                logger.warn("Missing email or notificationsEnabled in request");
                response.put("status", "error");
                response.put("message", "Email and notificationsEnabled are required");
                return ResponseEntity.badRequest().body(response);
            }

            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setNotificationsEnabled(notificationsEnabled);
                userService.updateUser(user);
                response.put("status", "success");
                response.put("message", "Notification settings updated successfully");
                logger.info("Notification settings updated successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found");
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (ClassCastException e) {
            logger.error("Invalid notificationsEnabled format: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Invalid notificationsEnabled format: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            logger.error("Error updating notifications: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update notifications: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        logger.info("Fetching current user with authHeader: {}", authHeader);
        Map<String, Object> response = new HashMap<>();
        try {
            String email = extractEmailFromToken(authHeader);
            logger.info("Looking up user with email: {}", email);
            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                response.put("email", user.getEmail());
                response.put("username", user.getUsername());
                response.put("role", user.getRole());
                response.put("phonenumber", user.getPhonenumber());
                response.put("homeAirport", user.getHomeAirport());
                response.put("travellers", user.getTravellers());
                response.put("paymentMethods", user.getPaymentMethods());
                response.put("cardDetails", user.getCardDetails());
                response.put("notificationsEnabled", user.isNotificationsEnabled());
                if (user.getProfilePicture() != null) {
                    response.put("profilePicture", java.util.Base64.getEncoder().encodeToString(user.getProfilePicture()));
                }
                response.put("status", "success");
                response.put("message", "Current user fetched successfully");
                logger.info("Current user fetched successfully for email: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "User not found for email: " + email);
                logger.warn("User not found for email: {}", email);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            logger.error("Error in getCurrentUser: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to fetch current user: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/update-profile-picture")
    public ResponseEntity<Map<String, Object>> updateProfilePicture(
            @RequestParam("email") String email,
            @RequestParam("file") MultipartFile file,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        logger.info("Updating profile picture for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            if (file == null || file.isEmpty()) {
                logger.warn("No file provided in profile picture update request");
                response.put("status", "error");
                response.put("message", "No file provided");
                return ResponseEntity.badRequest().body(response);
            }

            User updatedUser = userService.updateProfilePicture(email, file);
            response.put("username", updatedUser.getUsername());
            response.put("email", updatedUser.getEmail());
            response.put("role", updatedUser.getRole());
            response.put("phonenumber", updatedUser.getPhonenumber());
            response.put("homeAirport", updatedUser.getHomeAirport());
            response.put("travellers", updatedUser.getTravellers());
            response.put("paymentMethods", updatedUser.getPaymentMethods());
            response.put("cardDetails", updatedUser.getCardDetails());
            response.put("notificationsEnabled", updatedUser.isNotificationsEnabled());
            if (updatedUser.getProfilePicture() != null) {
                response.put("profilePicture", java.util.Base64.getEncoder().encodeToString(updatedUser.getProfilePicture()));
            }
            response.put("status", "success");
            response.put("message", "Profile picture updated successfully");
            logger.info("Profile picture updated successfully for email: {}", email);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            logger.error("Error updating profile picture: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to update profile picture: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            logger.error("Unexpected error updating profile picture: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Unexpected error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/add-card")
    public ResponseEntity<Map<String, Object>> addCardDetail(
            @RequestBody CardDetail cardDetail,
            @RequestParam("email") String email,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        logger.info("Adding card detail for email: {}", email);
        Map<String, Object> response = new HashMap<>();
        try {
            String tokenEmail = extractEmailFromToken(authHeader);
            if (!tokenEmail.equals(email)) {
                logger.warn("Email in token ({}) does not match request email ({})", tokenEmail, email);
                response.put("status", "error");
                response.put("message", "Unauthorized: Email in token does not match request email");
                return ResponseEntity.status(403).body(response);
            }

            // Validate card details
            if (cardDetail.getCardNumber() == null || cardDetail.getCardNumber().length() != 16) {
                logger.warn("Invalid card number for email: {}", email);
                response.put("status", "error");
                response.put("message", "Card number must be 16 digits");
                return ResponseEntity.badRequest().body(response);
            }
            if (cardDetail.getCvv() == null || !cardDetail.getCvv().matches("\\d{3,4}")) {
                logger.warn("Invalid CVV for email: {}", email);
                response.put("status", "error");
                response.put("message", "CVV must be 3 or 4 digits");
                return ResponseEntity.badRequest().body(response);
            }
            if (cardDetail.getCardholderName() == null || cardDetail.getCardholderName().trim().isEmpty()) {
                logger.warn("Invalid cardholder name for email: {}", email);
                response.put("status", "error");
                response.put("message", "Cardholder name is required");
                return ResponseEntity.badRequest().body(response);
            }

            userService.addCardDetail(email, cardDetail);
            response.put("status", "success");
            response.put("message", "Card detail added successfully");
            logger.info("Card detail added successfully for email: {}", email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error adding card detail: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to add card detail: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    private String extractEmailFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.error("Invalid or missing Authorization header: {}", authHeader);
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        String email = authHeader.substring(7);
        if (email.isEmpty()) {
            logger.error("Token is empty");
            throw new IllegalArgumentException("Token is empty");
        }
        logger.info("Extracted email from token: {}", email);
        return email;
    }
}