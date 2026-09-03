import { Link } from "react-router-dom";

function Sidebar() {
    return (
    <div
    className="bg-dark text-white vh-100"
    style={{ width: "250px" }}
    >
        <div className="p-3">
        <h3 className="text-center">Payroll System</h3>
        <hr />

        <ul className="nav flex-column">

            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"
                to="/dashboard"
            >
                📊 Dashboard
            </Link>
            </li>

            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"
                to="/employee"
            >
                👨 Employee
            </Link>
            </li>
            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"

                to="/department"
            >
                🏢 Department
            </Link>
            </li> 

            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"
                to="/attendance"
            >
                📅 Attendance
            </Link>
            </li>

            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"
                to="/salary"
            >
                💰 Salary
            </Link>
            </li>

            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white"
                to="/payment"
            >
                💳 Payment
            </Link>
            </li>

        </ul>
        </div>
    </div>
    );
}

export default Sidebar;