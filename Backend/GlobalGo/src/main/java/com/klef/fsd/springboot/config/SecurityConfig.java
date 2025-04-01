package com.klef.fsd.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encode passwords for secure storage
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF (for development)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login", 
                    "/api/auth/register", 
                    "/api/auth/admin/register" // Allow admin registration endpoint
                ).permitAll() // Publicly accessible routes
                .anyRequest().authenticated()); // Protect all other endpoints

        return http.build();
    }
}
