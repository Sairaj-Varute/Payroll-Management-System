package com.example.payroll.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.payroll.entity.Payment;

public interface PaymentRepository
		extends JpaRepository<Payment, Integer>{
	
	boolean existsByEmployeeEmpidAndPaymentmonthAndPaymentyear(
			Integer empid,
			String paymentmonth,
			Integer paymentyear);
	

}
