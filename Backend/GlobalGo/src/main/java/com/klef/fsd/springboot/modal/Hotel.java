package com.klef.fsd.springboot.modal;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Hotel {
    
    @Id
    private int id;
    private String name;
    private String location;
    private String address;
    
    @Column(length = 1000)
    private String description;
    
    private double price;
    private double rating;
    private int availableRooms;

    @ElementCollection
    private List<String> images;

    @ElementCollection
    private List<String> amenities;

    @ElementCollection
    private List<String> roomTypes;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public int getAvailableRooms() {
		return availableRooms;
	}

	public void setAvailableRooms(int availableRooms) {
		this.availableRooms = availableRooms;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public List<String> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<String> amenities) {
		this.amenities = amenities;
	}

	public List<String> getRoomTypes() {
		return roomTypes;
	}

	public void setRoomTypes(List<String> roomTypes) {
		this.roomTypes = roomTypes;
	}

	@Override
	public String toString() {
		return "Hotel [id=" + id + ", name=" + name + ", location=" + location + ", address=" + address
				+ ", description=" + description + ", price=" + price + ", rating=" + rating + ", availableRooms="
				+ availableRooms + ", images=" + images + ", amenities=" + amenities + ", roomTypes=" + roomTypes + "]";
	}

    
}
