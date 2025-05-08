package com.klef.fsd.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // ========================
    // Password Encoder Bean
    // ========================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt for password hashing
    }

    // ========================
    // Security Filter Chain
    // ========================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for API access (use cautiously)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/auth/admin/register",
                    "/api/auth/user/**",   // Allow GET user by email
                    "/api/auth/update",    // Allow user update access
                    "/api/flights/**"      // Allow public access to flights
                ).permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}