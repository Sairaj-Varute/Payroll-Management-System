import {useState, useEffect} from 'react'
import axios from 'axios';

function Department() {
    const[deptid, setDeptid] = useState(null);
    const[deptname, setDeptname] = useState("");
    const[deptlocation, setDeptlocation] = useState("");
    const[departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const result = await axios.get("http://localhost:8080/department");
            setDepartments(result.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };
    const saveDepartment = async (e) => {
        e.preventDefault();
        const department = { deptname, deptlocation };
        try {
            if (deptid===null) {
                await axios.post("http://localhost:8080/department", department);
                alert("Department saved successfully!");
            } else {
                await axios.put(`http://localhost:8080/department/${deptid}`, department);
                alert("Department updated successfully!");

            }clearForm();
            loadDepartments();
        } catch (error) {
            console.error("Error saving department:", error);
        }
       

    };
     const editDepartment = (dept) => {
            setDeptid(dept.deptid);
            setDeptname(dept.deptname);
            setDeptlocation(dept.deptlocation);
        };
    const deleteDepartment= async (id) => {
        if(!window.confirm("Are you sure you want to delete this department?")) {
            return;
        }try
        {
            await axios.delete(`http://localhost:8080/department/${id}`);
            alert("Department deleted successfully!");
            loadDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };
    const clearForm = () => {
        setDeptid(null);
        setDeptname("");
        setDeptlocation("");
    }
    return (
        <div className="container mt-4">

            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4>Department Form</h4>
                        </div>
                        <div className="card-body">
                           <form onSubmit={saveDepartment}>
                                <div className="mb-3">
                                    <label htmlFor="deptname" className="form-label">Department Name</label>
                                    <input type="text" className="form-control" id="deptname" value={deptname} onChange={(e) => setDeptname(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="deptlocation" className="form-label">Department Location</label>
                                    <input type="text" className="form-control" id="deptlocation" value={deptlocation} onChange={(e) => setDeptlocation(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary me-2">{deptid === null ? "Save" : "Update"}</button>
                                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
                                </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4>Department List</h4>
                        </div>
                        <div className="card-body">
                           <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Department Name</th>
                                        <th>Department Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dept) => (
                                        <tr key={dept.deptid}>
                                            <td>{dept.deptid}</td>
                                            <td>{dept.deptname}</td>
                                            <td>{dept.deptlocation}</td>
                                            <td>
                                                <button className="btn btn-sm btn-warning me-2" onClick={() => editDepartment(dept)}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => deleteDepartment(dept.deptid)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
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
