
package com.example.payroll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.payroll.dto.LoginRequest;
import com.example.payroll.entity.Admin;
import com.example.payroll.repository.AdminRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        System.out.println(
                "Username : "
                + request.getUsername());

        Admin admin =
                repository.findByUsername(
                        request.getUsername());

        if (admin == null) {

            System.out.println(
                    "User Not Found");

            return "INVALID";
        }

        System.out.println(
                "Database User : "
                + admin.getUsername());

        boolean match =
        	    request.getPassword().equals(
        	        admin.getPassword());

        System.out.println(
                "Password Match : "
                + match);

        if (match) {

            System.out.println(
                    "SUCCESS LOGIN");

            return "SUCCESS";
        }

        System.out.println(
                "INVALID LOGIN");

        return "INVALID";
    }

    @GetMapping("/test")
    public String test() {

        return "Auth Controller Working";
    }
}

