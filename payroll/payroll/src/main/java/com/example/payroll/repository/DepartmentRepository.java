package com.example.payroll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.payroll.entity.Department;

public interface DepartmentRepository
				extends JpaRepository<Department, Integer>{
	
}