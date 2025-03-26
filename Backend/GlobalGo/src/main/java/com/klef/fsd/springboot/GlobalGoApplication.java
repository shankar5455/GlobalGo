package com.klef.fsd.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GlobalGoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GlobalGoApplication.class, args);
		System.out.println("Project is Running.....");
	}

}
