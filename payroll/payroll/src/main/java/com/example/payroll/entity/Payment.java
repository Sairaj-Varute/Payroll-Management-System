package com.example.payroll.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(
		name = "payment",
		uniqueConstraints= {
				@UniqueConstraint(
						columnNames = {
								"empid",
								"paymentmonth",
								"paymentyear"
						})
		})

public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer paymentid;
	
	private String paymentmonth;
	private Integer paymentyear;
	private LocalDate paymentdate;
	private String paymentmode;
	private Double amount;
	private String remarks;
	
	@ManyToOne
	@JoinColumn(name = "empid")
	private Employee employee;
	
	public Integer getPaymentid() {
		return paymentid;
	}
	
	public void setPaymentid(Integer paymentid) {
		this.paymentid = paymentid;
	}
	
	public String getPaymentmonth() {
		return paymentmonth;
	}
	
	public void setPaymentmonth(String paymentmonth) {
		this.paymentmonth = paymentmonth;
	}
	
	public LocalDate getPaymentdate() {
		return paymentdate;
	}
	
	public void setPaymentdate(LocalDate paymentdate) {
		this.paymentdate = paymentdate;
	}
	
	public Integer getPaymentyear() {
		return paymentyear;
	}
	
	public void setPaymentyear(Integer paymentyear) {
		this.paymentyear = paymentyear;
	}
	
	public String getPaymentmode() {
		return paymentmode;
	}
	
	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
	}
	
	public Double getAmount() {
		return amount;
	}
	
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public String getRemarks() {
		return remarks;
	}
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public Employee getEmployee() {
		return employee;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

}
