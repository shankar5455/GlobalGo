package com.klef.fsd.springboot.repository;

import com.klef.fsd.springboot.modal.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}
