package com.klef.fsd.springboot.repository;

import com.klef.fsd.springboot.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email only (password verification is done in service)
    Optional<User> findByEmail(String email);
}
