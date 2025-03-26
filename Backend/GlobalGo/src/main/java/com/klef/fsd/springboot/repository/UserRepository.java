package com.klef.fsd.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.fsd.springboot.modal.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}