package com.klef.fsd.springboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.fsd.springboot.modal.Booking;
import com.klef.fsd.springboot.modal.BookingType;
import com.klef.fsd.springboot.modal.User;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByUserAndType(User user, BookingType type);
}