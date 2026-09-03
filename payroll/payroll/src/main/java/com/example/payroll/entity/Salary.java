package com.example.payroll.entity;

import jakarta.persistence.*;

@Entity
@Table(name="salary")

public class Salary {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer salaryid;
	
	private Double basicsalary;
	private Double hra;
	private Double da;
	private Double ta;
	private Double pf;
	private Double netsalary;
	
	@OneToOne
	@JoinColumn(name = "empid")
	private Employee employee;
	
	public Integer getSalaryid() {
		return salaryid;
	}
	
	public void setSalaryid(Integer salaryid) {
		this.salaryid = salaryid;
	}
	
	public Double getBasicsalary() {
		return basicsalary;
	}
	
	public void setBasicsalary(Double basicsalary) {
		this.basicsalary = basicsalary;
	}
	
	public Double getHra() {
		return hra;
	}
	
	public void setHra(Double hra) {
		this.hra = hra;
	}
	
	public Double getDa() {
		return da;
	}
	
	public void setDa(Double da) {
		this.da = da;
	}
	
	public Double getTa() {
		return ta;
	}
	
	public void setTa(Double ta) {
		this.ta = ta;
	}
	
	public Double getPf() {
		return pf;
	}
	
	public void setPf(Double pf) {
		this.pf = pf;
	}
	
	public Double getNetsalary() {
		return netsalary;
	}
	
	public void setNetsalary(Double netsalary) {
		this.netsalary = netsalary;
	}
	
	public Employee getEmployee() {
		return employee;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	

}
