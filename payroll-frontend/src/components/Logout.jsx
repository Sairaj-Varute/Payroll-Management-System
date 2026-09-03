import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("admin");
        navigate("/", { replace: true });
    }, [navigate]);

    return null;
}

export default Logout;