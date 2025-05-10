package com.klef.fsd.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.fsd.springboot.modal.Cab;

public interface CabRepository extends JpaRepository<Cab, Integer> {
}
