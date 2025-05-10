package com.klef.fsd.springboot.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.modal.Cab;
import com.klef.fsd.springboot.service.CabService;

@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/api/cabs")
public class CabController {

    @Autowired
    private CabService cabService;

    @PostMapping
    public Cab addCab(@RequestBody Cab cab) {
        return cabService.addCab(cab);
    }

    @GetMapping
    public List<Cab> getAllCabs() {
        return cabService.getAllCabs();
    }

    // Get cab by ID
    @GetMapping("/{id}")
    public Cab getCabById(@PathVariable int id) {
        return cabService.getCabById(id)
                .orElseThrow(() -> new RuntimeException("Cab not found with id " + id));
    }
}
