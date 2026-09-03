package com.example.payroll.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name="department")
public class Department{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer deptid;
	
	private String deptname;
	private String location;
	
	public Integer getDeptid() {
		return deptid;
	}
	
	public void setDeptid(Integer deptid) {
		this.deptid= deptid;		
	}
	
	public String getDeptname() {
		return deptname;
	}
	
	public void setDeptname(String deptname) {
		this.deptname = deptname;
		}
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location =location;
		}
	
}