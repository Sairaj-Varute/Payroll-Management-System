package com.example.payroll.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.payroll.entity.Payment;
import com.example.payroll.repository.PaymentRepository;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")

public class PaymentController {
	
	@Autowired
	private PaymentRepository repository;
	
	@GetMapping
	public List<Payment> getAllPayments(){
		return repository.findAll();
	}
	
	@PostMapping
	public ResponseEntity<?>  savePayment(
			@RequestBody Payment payment){
		
		boolean exists = 
				repository.existsByEmployeeEmpidAndPaymentmonthAndPaymentyear(
						payment.getEmployee().getEmpid(),
						payment.getPaymentmonth(),
						payment.getPaymentyear());
		
		if (exists) {
			return ResponseEntity.badRequest()
					.body("Salary already paid for this month");
		}
		
		return ResponseEntity.ok(
				repository.save(payment));
	}
	
	@PutMapping("/{id}")
	public Payment updatePayment(
			@PathVariable Integer id,
			@RequestBody Payment payment) {
		
		payment.setPaymentid(id);
		
		return repository.save(payment);
	}
	
	@DeleteMapping("/{id}")
	public String deletePayment(
			@PathVariable Integer id) {
		
		repository.deleteById(id);
		
		return "Payment Deleted.";
	}
}
