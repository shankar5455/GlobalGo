package com.klef.fsd.springboot.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.fsd.springboot.modal.Cab;
import com.klef.fsd.springboot.repository.CabRepository;

@Service
public class CabServiceImpl implements CabService {

    @Autowired
    private CabRepository cabRepository;

    @Override
    public Cab addCab(Cab cab) {
        return cabRepository.save(cab);
    }

    @Override
    public List<Cab> getAllCabs() {
        return cabRepository.findAll();
    }

    // Implementation of getCabById
    @Override
    public Optional<Cab> getCabById(int id) {
        return cabRepository.findById(id);
    }
}
