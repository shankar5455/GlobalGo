package com.klef.fsd.springboot.modal;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String airline;
    private String flightNumber;
    
    // Departure Details
    private String departureCity;
    private String departureAirport;
    private LocalTime departureTime;
    private LocalDate departureDate;

    // Arrival Details
    private String arrivalCity;
    private String arrivalAirport;
    private LocalTime arrivalTime;
    private LocalDate arrivalDate;

    private String duration;
    private double price;
    private String travelClass;
    private int stops;
    private int availableSeats;

    // Constructors
    public Flight() {}

    public Flight(String airline, String flightNumber, String departureCity, String departureAirport, 
                  LocalTime departureTime, LocalDate departureDate, String arrivalCity, String arrivalAirport, 
                  LocalTime arrivalTime, LocalDate arrivalDate, String duration, double price, 
                  String travelClass, int stops, int availableSeats) {
        this.airline = airline;
        this.flightNumber = flightNumber;
        this.departureCity = departureCity;
        this.departureAirport = departureAirport;
        this.departureTime = departureTime;
        this.departureDate = departureDate;
        this.arrivalCity = arrivalCity;
        this.arrivalAirport = arrivalAirport;
        this.arrivalTime = arrivalTime;
        this.arrivalDate = arrivalDate;
        this.duration = duration;
        this.price = price;
        this.travelClass = travelClass;
        this.stops = stops;
        this.availableSeats = availableSeats;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAirline() {
		return airline;
	}

	public void setAirline(String airline) {
		this.airline = airline;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getDepartureCity() {
		return departureCity;
	}

	public void setDepartureCity(String departureCity) {
		this.departureCity = departureCity;
	}

	public String getDepartureAirport() {
		return departureAirport;
	}

	public void setDepartureAirport(String departureAirport) {
		this.departureAirport = departureAirport;
	}

	public LocalTime getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(LocalTime departureTime) {
		this.departureTime = departureTime;
	}

	public LocalDate getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(LocalDate departureDate) {
		this.departureDate = departureDate;
	}

	public String getArrivalCity() {
		return arrivalCity;
	}

	public void setArrivalCity(String arrivalCity) {
		this.arrivalCity = arrivalCity;
	}

	public String getArrivalAirport() {
		return arrivalAirport;
	}

	public void setArrivalAirport(String arrivalAirport) {
		this.arrivalAirport = arrivalAirport;
	}

	public LocalTime getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(LocalTime arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public LocalDate getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(LocalDate arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getTravelClass() {
		return travelClass;
	}

	public void setTravelClass(String travelClass) {
		this.travelClass = travelClass;
	}

	public int getStops() {
		return stops;
	}

	public void setStops(int stops) {
		this.stops = stops;
	}

	public int getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}

	@Override
	public String toString() {
		return "Flight [id=" + id + ", airline=" + airline + ", flightNumber=" + flightNumber + ", departureCity="
				+ departureCity + ", departureAirport=" + departureAirport + ", departureTime=" + departureTime
				+ ", departureDate=" + departureDate + ", arrivalCity=" + arrivalCity + ", arrivalAirport="
				+ arrivalAirport + ", arrivalTime=" + arrivalTime + ", arrivalDate=" + arrivalDate + ", duration="
				+ duration + ", price=" + price + ", travelClass=" + travelClass + ", stops=" + stops
				+ ", availableSeats=" + availableSeats + "]";
	}

    
}
