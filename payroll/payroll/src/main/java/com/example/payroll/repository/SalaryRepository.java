package com.example.payroll.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.payroll.entity.Salary;

public interface SalaryRepository 
		extends JpaRepository<Salary, Integer>{
	Salary findByEmployeeEmpid(Integer empid);

}
