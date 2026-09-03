package com.example.payroll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.payroll.entity.Admin;

public interface AdminRepository
        extends JpaRepository<Admin,Integer> {

    Admin findByUsername(String username);
}
