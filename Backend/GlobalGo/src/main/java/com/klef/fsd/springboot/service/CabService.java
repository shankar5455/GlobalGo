package com.klef.fsd.springboot.service;

import java.util.List;
import java.util.Optional;
import com.klef.fsd.springboot.modal.Cab;

public interface CabService {
    public Cab addCab(Cab cab);
    public List<Cab> getAllCabs();
    
    // New method to get Cab by ID
    public Optional<Cab> getCabById(int id);
}
