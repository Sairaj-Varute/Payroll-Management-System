package com.example.payroll.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.payroll.entity.Department;
import com.example.payroll.repository.DepartmentRepository;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins="*")

public class DepartmentController
{
	
		@Autowired
		private DepartmentRepository repository;
		
		//Get all departments
		@GetMapping
		public List<Department> getAllDepartments(){
			return repository.findAll();
		}
		
		//save Department
		@PostMapping
		public Department saveDepartment(
				@RequestBody Department department) {
			return repository.save(department);
		}
		
		//Get department by id
		@GetMapping("/{id}")
		public Department getDepartmentById(
				@PathVariable Integer id) {
			
			return repository.findById(id).orElse(null);
		}
		
		//update department
		@PutMapping("/{id}")
		public Department updateDepartment(
				@PathVariable Integer id,
				@RequestBody Department department) {
			
			department.setDeptid(id);
			return repository.save(department);
		}
		
		//delete department
		@DeleteMapping("/{id}")
		public String deleteDepartment(
				@PathVariable Integer id) {
			
			repository.deleteById(id);
			return "Department Deleted";
		}
}