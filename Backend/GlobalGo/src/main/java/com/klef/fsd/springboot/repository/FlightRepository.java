package com.klef.fsd.springboot.repository;

import com.klef.fsd.springboot.modal.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
}
