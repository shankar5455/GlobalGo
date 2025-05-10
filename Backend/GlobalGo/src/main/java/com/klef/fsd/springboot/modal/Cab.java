package com.klef.fsd.springboot.modal;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Cab {
    @Id
    private int id;

    private String type;
    private String name;
    private int capacity;
    private int luggage;
    private double price;
    private String image;

    @ElementCollection
    private List<String> features;

    // Getters and setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getLuggage() {
        return luggage;
    }
    public void setLuggage(int luggage) {
        this.luggage = luggage;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getFeatures() {
        return features;
    }
    public void setFeatures(List<String> features) {
        this.features = features;
    }
}
