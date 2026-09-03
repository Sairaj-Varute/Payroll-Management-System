package com.example.payroll.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.payroll.entity.Salary;
import com.example.payroll.repository.SalaryRepository;

@RestController
@RequestMapping("/salary")
@CrossOrigin("*")
public class SalaryController {

    @Autowired
    private SalaryRepository repository;

    // Get all salaries
    @GetMapping
    public List<Salary> getAllSalary() {
        return repository.findAll();
    }

    // Get salary by salary ID
    @GetMapping("/{id}")
    public Salary getSalaryById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    // Get salary by employee ID
    @GetMapping("/employee/{empid}")
    public Salary getSalaryByEmployee(@PathVariable Integer empid) {
        return repository.findByEmployeeEmpid(empid);
    }

    // Save new salary
    @PostMapping
    public Salary saveSalary(@RequestBody Salary salary) {
        return repository.save(salary);
    }

    // Update salary
    @PutMapping("/{id}")
    public Salary updateSalary(@PathVariable Integer id,
                               @RequestBody Salary salary) {

        salary.setSalaryid(id);
        return repository.save(salary);
    }

    // Delete salary
    @DeleteMapping("/{id}")
    public String deleteSalary(@PathVariable Integer id) {

        repository.deleteById(id);
        return "Salary Deleted";
    }
}