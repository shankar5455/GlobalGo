package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.Hotel;

import java.util.List;

public interface HotelService {
    Hotel addHotel(Hotel hotel);
    List<Hotel> getAllHotels();
    Hotel getHotelById(int id);
}
