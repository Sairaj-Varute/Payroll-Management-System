package com.example.payroll.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name="employee")

public class Employee {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Integer empid;
	
	private String empname;
	private String gender;
	private String mobile;
	private String email;
	private String designation;
	private LocalDate joiningdate;
	private Double basicsalary;
	
	@ManyToOne
	@JoinColumn(name = "deptid")
	private Department department;
	
	public Integer getEmpid() {
		return empid;
	}
	
	public void setEmpid(Integer empid) {
		this.empid = empid;
	}
	
	public String getEmpname() {
		return empname;
	}
	
	public void setEmpname(String empname) {
		this.empname = empname;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getMobile() {
		return mobile;
	}
	
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getDesignation() {
		return designation;
	}
	
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
	public LocalDate getJoiningDate() {
		return joiningdate;
	}
	
	public void setJoiningDate(LocalDate joiningdate) {
		this.joiningdate = joiningdate;
	}
	
	public Double getBasicsalary() {
		return basicsalary;
	}
	
	public void setBasicsalary(Double basicsalary) {
		this.basicsalary = basicsalary;
	}
	
	public Department getDepartment() {
		return department;
	}
	
	public void setDepartment(Department department) {
		this.department = department;
	}

}
