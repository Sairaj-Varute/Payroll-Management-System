import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Attendance from "./components/Attendance";
import Salary from "./components/Salary";
import Payment from "./components/Payment";
import Department from "./components/Department";
import Login from "./components/Login";
import Logout from "./components/Logout";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        {children}
      </div>
    </div>
  );
}

// Protected Route
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Layout>
                <Employee />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Salary */}
        <Route
          path="/salary"
          element={
            <ProtectedRoute>
              <Layout>
                <Salary />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Layout>
                <Payment />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Department */}
        <Route
          path="/department"
          element={
            <ProtectedRoute>
              <Layout>
                <Department />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Logout */}
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;