package com.klef.fsd.springboot.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Restaurant {
    @Id
    private int id;
    private String name;
    private String cuisine;
    private String location;
    private String address;
    private double rating;
    private String priceRange;
    private String openingHours;
    private String image;
    private String description;
    private String popularDishes;
    private boolean reservationAvailable;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCuisine() {
		return cuisine;
	}
	public void setCuisine(String cuisine) {
		this.cuisine = cuisine;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public String getPriceRange() {
		return priceRange;
	}
	public void setPriceRange(String priceRange) {
		this.priceRange = priceRange;
	}
	public String getOpeningHours() {
		return openingHours;
	}
	public void setOpeningHours(String openingHours) {
		this.openingHours = openingHours;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPopularDishes() {
		return popularDishes;
	}
	public void setPopularDishes(String popularDishes) {
		this.popularDishes = popularDishes;
	}
	public boolean isReservationAvailable() {
		return reservationAvailable;
	}
	public void setReservationAvailable(boolean reservationAvailable) {
		this.reservationAvailable = reservationAvailable;
	}

    // Getters and setters
    // (Include all fields)
}
