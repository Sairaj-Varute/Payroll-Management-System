import { useState, useEffect } from "react";
import axios from "axios";

function Employee() {
    const [empid, setEmpid] = useState(null);

    const [employee, setEmployee] = useState({
        empname: "",
        gender: "",
        mobile: "",
        email: "",
        designation: "",
        joiningdate: "",
        basicsalary: "",
        deptid: ""
    });

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, []);

    const loadEmployees = async () => {
        try {
            const result = await axios.get("http://localhost:8080/employees");
            setEmployees(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadDepartments = async () => {
        try {
            const result = await axios.get("http://localhost:8080/departments");
            setDepartments(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const saveEmployee = async (e) => {
        e.preventDefault();

        const employeeData = {
            empname: employee.empname,
            gender: employee.gender,
            mobile: employee.mobile,
            email: employee.email,
            designation: employee.designation,
            joiningdate: employee.joiningdate,
            basicsalary: employee.basicsalary,
            department: {
                deptid: employee.deptid
            }
        };

        try {
            if (empid === null) {
                await axios.post(
                    "http://localhost:8080/employee",
                    employeeData
                );
                alert("Employee created successfully!");
            } else {
                await axios.put(
                    `http://localhost:8080/employee/${empid}`,
                    employeeData
                );
                alert("Employee updated successfully!");
            }

            clearForm();
            loadEmployees();
        } catch (error) {
            console.error(error);
            alert("Operation failed!");
        }
    };

    const editEmployee = (emp) => {
        setEmpid(emp.empid);

        setEmployee({
            empname: emp.empname,
            gender: emp.gender,
            mobile: emp.mobile,
            email: emp.email,
            designation: emp.designation,
            joiningdate: emp.joiningdate,
            basicsalary: emp.basicsalary,
            deptid: emp.department?.deptid || ""
        });
    };

    const deleteEmployee = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await axios.delete(`http://localhost:8080/employee/${id}`);
            alert("Employee deleted successfully!");
            loadEmployees();
        } catch (error) {
            console.error(error);
        }
    };

    const clearForm = () => {
        setEmpid(null);

        setEmployee({
            empname: "",
            gender: "",
            mobile: "",
            email: "",
            designation: "",
            joiningdate: "",
            basicsalary: "",
            deptid: ""
        });
    };

    return (
        <div className="container mt-4">

            <div className="card shadow mb-4">

                <div className="card-header bg-primary text-white">
                    <h3>Employee Management</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={saveEmployee}>

                        <div className="mb-3">
                            <label className="form-label">
                                Employee Name
                            </label>

                            <input
                                type="text"
                                name="empname"
                                value={employee.empname}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Gender</label>

                            <select
                                name="gender"
                                value={employee.gender}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile</label>

                            <input
                                type="text"
                                name="mobile"
                                value={employee.mobile}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>

                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Designation
                            </label>

                            <input
                                type="text"
                                name="designation"
                                value={employee.designation}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Joining Date
                            </label>

                            <input
                                type="date"
                                name="joiningdate"
                                value={employee.joiningdate}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Basic Salary
                            </label>

                            <input
                                type="number"
                                name="basicsalary"
                                value={employee.basicsalary}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Department
                            </label>

                            <select
                                name="deptid"
                                value={employee.deptid}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select Department</option>

                                {departments.map((dept) => (
                                    <option
                                        key={dept.deptid}
                                        value={dept.deptid}
                                    >
                                        {dept.deptname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            {empid === null ? "Create" : "Update"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={clearForm}
                        >
                            Clear
                        </button>

                    </form>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h4>Employee List</h4>
                </div>

                <div className="card-body">

                    <table className="table table-bordered table-striped">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Designation</th>
                                <th>Joining Date</th>
                                <th>Basic Salary</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {employees.map((emp) => (
                                <tr key={emp.empid}>
                                    <td>{emp.empid}</td>
                                    <td>{emp.empname}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.mobile}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.designation}</td>
                                    <td>{emp.joiningdate}</td>
                                    <td>{emp.basicsalary}</td>
                                    <td>{emp.department?.deptname}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() =>
                                                editEmployee(emp)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteEmployee(emp.empid)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Employee;