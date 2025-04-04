package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.modal.Flight;
import com.klef.fsd.springboot.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    // Add a new flight
    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Get all flights
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Get a flight by ID
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    // Delete a flight
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
