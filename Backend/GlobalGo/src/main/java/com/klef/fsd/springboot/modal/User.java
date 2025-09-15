package com.klef.fsd.springboot.modal;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String phonenumber;

    @Column
    private String homeAirport; // For preferences

    @ElementCollection
    @CollectionTable(name = "user_travellers", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "traveller_name")
    private List<String> travellers; // List of traveller names

    @ElementCollection
    @CollectionTable(name = "user_payment_methods", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "payment_method")
    private List<String> paymentMethods; // Legacy field for backward compatibility

    @ElementCollection
    @CollectionTable(name = "user_card_details", joinColumns = @JoinColumn(name = "user_id"))
    private List<CardDetail> cardDetails; // List of card details

    @Column
    private boolean notificationsEnabled; // Notification preference

    @Lob
    @Column(name = "profile_picture", nullable = true)
    private byte[] profilePicture; // Store profile picture as BLOB

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }

    public String getHomeAirport() { return homeAirport; }
    public void setHomeAirport(String homeAirport) { this.homeAirport = homeAirport; }

    public List<String> getTravellers() { return travellers; }
    public void setTravellers(List<String> travellers) { this.travellers = travellers; }

    public List<String> getPaymentMethods() { return paymentMethods; }
    public void setPaymentMethods(List<String> paymentMethods) { this.paymentMethods = paymentMethods; }

    public List<CardDetail> getCardDetails() { return cardDetails; }
    public void setCardDetails(List<CardDetail> cardDetails) { this.cardDetails = cardDetails; }

    public boolean isNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }

    public byte[] getProfilePicture() { return profilePicture; }
    public void setProfilePicture(byte[] profilePicture) { this.profilePicture = profilePicture; }

    // Embedded CardDetail class
    @Embeddable
    public static class CardDetail {
        @Column(name = "card_number")
        private String cardNumber;

        @Column(name = "cardholder_name")
        private String cardholderName;

        @Column(name = "cvv")
        private String cvv;

        // Getters and Setters
        public String getCardNumber() { return cardNumber; }
        public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

        public String getCardholderName() { return cardholderName; }
        public void setCardholderName(String cardholderName) { this.cardholderName = cardholderName; }

        public String getCvv() { return cvv; }
        public void setCvv(String cvv) { this.cvv = cvv; }
    }
}