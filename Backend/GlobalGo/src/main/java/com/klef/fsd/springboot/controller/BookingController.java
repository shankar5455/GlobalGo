package com.klef.fsd.springboot.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.modal.Booking;
import com.klef.fsd.springboot.modal.User;
import com.klef.fsd.springboot.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/user")
    public List<Booking> getUserBookings(@AuthenticationPrincipal User user) {
        return bookingService.getUserBookings(user);
    }

    @GetMapping("/user/{type}")
    public List<Booking> getUserBookingsByType(
            @AuthenticationPrincipal User user,
            @PathVariable String type
    ) {
        return bookingService.getUserBookingsByType(user, type);
    }

    @DeleteMapping("/{id}")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}