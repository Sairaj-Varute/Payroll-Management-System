import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const checkLogin = async (e) => {
        e.preventDefault();

        try {

            const result = await axios.post(
                "http://localhost:8080/auth/login",
                login
            );

            if (result.data === "SUCCESS") {

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("admin", login.username);

                navigate("/dashboard");

            } else {

                setMessage("Invalid username or password");

            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage("Unable to connect to the server.");
            }
        }
    };

    return (
        <div className="container">
            <div
                className="row justify-content-center"
                style={{ marginTop: "100px" }}
            >
                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center">
                                Payroll Management System
                            </h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={checkLogin}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={login.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={login.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                            {message && (
                                <div className="alert alert-danger mt-3">
                                    {message}
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;