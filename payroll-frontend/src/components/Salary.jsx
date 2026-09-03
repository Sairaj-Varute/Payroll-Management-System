import { useState, useEffect } from "react";
import axios from "axios";

function Salary() {

    const [salaryid, setSalaryid] = useState(null);

    const [salary, setSalary] = useState({
        empid: "",
        basicsalary: "",
        hra: "",
        da: "",
        ta: "",
        pf: "",
        netsalary: ""
    });

    const [salaries, setSalaries] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadSalary();
        loadEmployees();
    }, []);

    const loadSalary = async () => {
        const result = await axios.get("http://localhost:8080/salary");
        setSalaries(result.data);
    };

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/employee");
        setEmployees(result.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedSalary = {
            ...salary,
            [name]: value
        };

        const basic = parseFloat(updatedSalary.basicsalary || 0);
        const hra = parseFloat(updatedSalary.hra || 0);
        const da = parseFloat(updatedSalary.da || 0);
        const ta = parseFloat(updatedSalary.ta || 0);
        const pf = parseFloat(updatedSalary.pf || 0);

        updatedSalary.netsalary =
            basic + hra + da + ta - pf;

        setSalary(updatedSalary);
    };

    const saveSalary = async (e) => {
        e.preventDefault();

        const salaryData = {
            basicsalary: salary.basicsalary,
            hra: salary.hra,
            da: salary.da,
            ta: salary.ta,
            pf: salary.pf,
            netsalary: salary.netsalary,
            employee: {
                empid: salary.empid
            }
        };

        if (salaryid === null) {
            await axios.post(
                "http://localhost:8080/salary",
                salaryData
            );
            alert("Salary Saved Successfully!");
        } else {
            await axios.put(
                `http://localhost:8080/salary/${salaryid}`,
                salaryData
            );
            alert("Salary Updated Successfully!");
        }

        clearForm();
        loadSalary();
    };

    const editSalary = (sal) => {
        setSalaryid(sal.salaryid);

        setSalary({
            empid: sal.employee?.empid || "",
            basicsalary: sal.basicsalary,
            hra: sal.hra,
            da: sal.da,
            ta: sal.ta,
            pf: sal.pf,
            netsalary: sal.netsalary
        });
    };

    const deleteSalary = async (id) => {

        if (!window.confirm("Are you sure?")) {
            return;
        }

        await axios.delete(
            `http://localhost:8080/salary/${id}`
        );

        loadSalary();
    };

    const clearForm = () => {
        setSalaryid(null);

        setSalary({
            empid: "",
            basicsalary: "",
            hra: "",
            da: "",
            ta: "",
            pf: "",
            netsalary: ""
        });
    };

    return (
        <div className="container mt-4">

            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Salary Management</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={saveSalary}>
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Employee</label>
                                <select
                                    className="form-select"
                                    name="empid"
                                    value={salary.empid}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((emp) => (
                                        <option
                                            key={emp.empid}
                                            value={emp.empid}
                                        >
                                            {emp.empname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Basic Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="basicsalary"
                                    value={salary.basicsalary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>HRA</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="hra"
                                    value={salary.hra}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>DA</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="da"
                                    value={salary.da}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>TA</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="ta"
                                    value={salary.ta}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>PF</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="pf"
                                    value={salary.pf}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Net Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={salary.netsalary}
                                    readOnly
                                />
                            </div>

                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    {salaryid === null
                                        ? "Save"
                                        : "Update"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={clearForm}
                                >
                                    Clear
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Salary List</h5>
                </div>

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Basic</th>
                                <th>HRA</th>
                                <th>DA</th>
                                <th>TA</th>
                                <th>PF</th>
                                <th>Net Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {salaries.map((sal) => (
                                <tr key={sal.salaryid}>
                                    <td>{sal.salaryid}</td>
                                    <td>{sal.employee?.empname}</td>
                                    <td>{sal.basicsalary}</td>
                                    <td>{sal.hra}</td>
                                    <td>{sal.da}</td>
                                    <td>{sal.ta}</td>
                                    <td>{sal.pf}</td>
                                    <td>{sal.netsalary}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                editSalary(sal)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteSalary(
                                                    sal.salaryid
                                                )
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

export default Salary;