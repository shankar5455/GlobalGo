package com.klef.fsd.springboot.service;


import org.springframework.stereotype.Service;

import com.klef.fsd.springboot.modal.Booking;
import com.klef.fsd.springboot.modal.BookingStatus;
import com.klef.fsd.springboot.modal.BookingType;
import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.repository.BookingRepository;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }

    public List<Booking> getUserBookingsByType(User user, String type) {
        BookingType bookingType = BookingType.valueOf(type.toUpperCase());
        return bookingRepository.findByUserAndType(user, bookingType);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}