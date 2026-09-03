import { useState, useEffect } from "react";
import axios from "axios";

function Department() {
    const [deptid, setDeptid] = useState(null);
    const [deptname, setDeptname] = useState("");
    const [location, setLocation] = useState("");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    // Load Departments
    const loadDepartments = async () => {
        try {
            const result = await axios.get("http://localhost:8080/departments");
            setDepartments(result.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    // Save Department
    const saveDepartment = async (e) => {
        e.preventDefault();

        const department = {
            deptname,
            location
        };

        try {
            if (deptid === null) {
                await axios.post(
                    "http://localhost:8080/departments",
                    department
                );
                alert("Department created successfully!");
            } else {
                await axios.put(
                    `http://localhost:8080/departments/${deptid}`,
                    department
                );
                alert("Department updated successfully!");
            }

            clearForm();
            loadDepartments();
        } catch (error) {
            console.error("Error saving department:", error);
        }
    };

    // Edit Department
    const editDepartment = (dept) => {
        setDeptid(dept.deptid);
        setDeptname(dept.deptname);
        setLocation(dept.location);
    };

    // Delete Department
    const deleteDepartment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/departments/${id}`);
            alert("Department deleted successfully!");
            loadDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    // Clear Form
    const clearForm = () => {
        setDeptid(null);
        setDeptname("");
        setLocation("");
    };

    return (
        <div className="container mt-4">
            <div className="row">

                {/* Form */}
                <div className="col-md-4">
                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">
                            <h4>Department Form</h4>
                        </div>

                        <div className="card-body">

                            <form onSubmit={saveDepartment}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Department Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={deptname}
                                        onChange={(e) =>
                                            setDeptname(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    {deptid === null ? "Create" : "Update"}
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
                </div>

                {/* Table */}
                <div className="col-md-8">
                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">
                            <h4>Department List</h4>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-striped">

                                <thead>
                                    <tr>
                                        <th>Department ID</th>
                                        <th>Department Name</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {departments.length > 0 ? (
                                        departments.map((dept) => (
                                            <tr key={dept.deptid}>
                                                <td>{dept.deptid}</td>
                                                <td>{dept.deptname}</td>
                                                <td>{dept.location}</td>

                                                <td>
                                                    <button
                                                        className="btn btn-warning me-2"
                                                        onClick={() =>
                                                            editDepartment(dept)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            deleteDepartment(
                                                                dept.deptid
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >
                                                No Departments Found
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Department;