import { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {

    const [attid, setAttid] = useState(null);

    const [attendance, setAttendance] = useState({
        empid: "",
        attendance_date: "",
        status: ""
    });

    const [attendances, setAttendances] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadAttendance();
        loadEmployees();
    }, []);

    const loadAttendance = async () => {
        const result = await axios.get("http://localhost:8080/attendance");
        setAttendances(result.data);
    };

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/employee");
        setEmployees(result.data);
    };

    const handleChange = (e) => {
        setAttendance({
            ...attendance,
            [e.target.name]: e.target.value
        });
    };

    const saveAttendance = async (e) => {
        e.preventDefault();

        const attendanceData = {
            attendanceDate: attendance.attendance_date,
            status: attendance.status,
            employee: {
                empid: attendance.empid
            }
        };

        if (attid === null) {
            await axios.post(
                "http://localhost:8080/attendance",
                attendanceData
            );
            alert("Attendance Saved Successfully!");
        } else {
            await axios.put(
                `http://localhost:8080/attendance/${attid}`,
                attendanceData
            );
            alert("Attendance Updated Successfully!");
        }

        clearForm();
        loadAttendance();
    };

    const editAttendance = (att) => {
        setAttid(att.attid);

        setAttendance({
            empid: att.employee?.empid || "",
            attendance_date: att.attendanceDate,
            status: att.status
        });
    };

    const deleteAttendance = async (id) => {

        if (!window.confirm("Are you sure?")) {
            return;
        }

        await axios.delete(
            `http://localhost:8080/attendance/${id}`
        );

        loadAttendance();
    };

    const clearForm = () => {
        setAttid(null);

        setAttendance({
            empid: "",
            attendance_date: "",
            status: ""
        });
    };

    return (
        <div className="container mt-4">

            {/* Attendance Form */}

            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        Attendance Management
                    </h5>
                </div>

                <div className="card-body">
                    <form onSubmit={saveAttendance}>
                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Employee
                                </label>

                                <select
                                    className="form-select"
                                    name="empid"
                                    value={attendance.empid}
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

                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Attendance Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="attendance_date"
                                    value={attendance.attendance_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={attendance.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Status
                                    </option>
                                    <option value="Present">
                                        Present
                                    </option>
                                    <option value="Absent">
                                        Absent
                                    </option>
                                    <option value="Leave">
                                        Leave
                                    </option>
                                </select>
                            </div>

                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >
                                    {attid === null
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

            {/* Attendance List */}

            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        Attendance List
                    </h5>
                </div>

                <div className="card-body">
                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th width="150">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {attendances.map((att) => (
                                    <tr key={att.attid}>
                                        <td>{att.attid}</td>

                                        <td>
                                            {att.employee?.empname}
                                        </td>

                                        <td>
                                            {att.attendanceDate}
                                        </td>

                                        <td>
                                            {att.status}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() =>
                                                    editAttendance(att)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteAttendance(
                                                        att.attid
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

        </div>
    );
}

export default Attendance;