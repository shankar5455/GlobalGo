package com.klef.fsd.springboot.controller;

import com.klef.fsd.springboot.modal.Hotel;
import com.klef.fsd.springboot.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // Add a new hotel
    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel savedHotel = hotelService.addHotel(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    // Get all hotels
    @GetMapping
    public List<Hotel> getHotels() {
        return hotelService.getAllHotels();
    }

    // Get a specific hotel by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotel(@PathVariable int id) {
        Hotel hotel = hotelService.getHotelById(id);
        if (hotel != null) {
            return ResponseEntity.ok(hotel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
