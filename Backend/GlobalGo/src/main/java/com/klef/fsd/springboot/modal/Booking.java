package com.klef.fsd.springboot.modal;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private BookingType type; // FLIGHT, HOTEL, CAB

    @Enumerated(EnumType.STRING)
    private BookingStatus status; // CONFIRMED, CANCELLED, COMPLETED

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // PAID, PENDING, FAILED

    private Double totalPrice;
    private LocalDateTime bookingDate;

    // Flight Booking Fields
    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
    
    private LocalDateTime departureDate;
    private Integer passengers;
    private String seatClass;

    // Hotel Booking Fields
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
    
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private Integer guests;

    // Cab Booking Fields
    @ManyToOne
    @JoinColumn(name = "cab_id")
    private Cab cab;
    
    private String pickupLocation;
    private String dropoffLocation;
    private LocalDateTime pickupDateTime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public BookingType getType() {
		return type;
	}
	public void setType(BookingType type) {
		this.type = type;
	}
	public BookingStatus getStatus() {
		return status;
	}
	public void setStatus(BookingStatus status) {
		this.status = status;
	}
	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public Double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public LocalDateTime getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}
	public Flight getFlight() {
		return flight;
	}
	public void setFlight(Flight flight) {
		this.flight = flight;
	}
	public LocalDateTime getDepartureDate() {
		return departureDate;
	}
	public void setDepartureDate(LocalDateTime departureDate) {
		this.departureDate = departureDate;
	}
	public Integer getPassengers() {
		return passengers;
	}
	public void setPassengers(Integer passengers) {
		this.passengers = passengers;
	}
	public String getSeatClass() {
		return seatClass;
	}
	public void setSeatClass(String seatClass) {
		this.seatClass = seatClass;
	}
	public Hotel getHotel() {
		return hotel;
	}
	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	public LocalDateTime getCheckInDate() {
		return checkInDate;
	}
	public void setCheckInDate(LocalDateTime checkInDate) {
		this.checkInDate = checkInDate;
	}
	public LocalDateTime getCheckOutDate() {
		return checkOutDate;
	}
	public void setCheckOutDate(LocalDateTime checkOutDate) {
		this.checkOutDate = checkOutDate;
	}
	public Integer getGuests() {
		return guests;
	}
	public void setGuests(Integer guests) {
		this.guests = guests;
	}
	public Cab getCab() {
		return cab;
	}
	public void setCab(Cab cab) {
		this.cab = cab;
	}
	public String getPickupLocation() {
		return pickupLocation;
	}
	public void setPickupLocation(String pickupLocation) {
		this.pickupLocation = pickupLocation;
	}
	public String getDropoffLocation() {
		return dropoffLocation;
	}
	public void setDropoffLocation(String dropoffLocation) {
		this.dropoffLocation = dropoffLocation;
	}
	public LocalDateTime getPickupDateTime() {
		return pickupDateTime;
	}
	public void setPickupDateTime(LocalDateTime pickupDateTime) {
		this.pickupDateTime = pickupDateTime;
	}
    
}