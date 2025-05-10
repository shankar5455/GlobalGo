package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.Restaurant;
import java.util.List;

public interface RestaurantService {
    Restaurant addRestaurant(Restaurant restaurant);
    List<Restaurant> getAllRestaurants();
}
