import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../api/adminApi";
import "../Layout/register.css";

const AdminRegister = () => {
    const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await registerAdmin(admin);
            alert(response.data.message);
            setAdmin({ name: "", email: "", password: "" });
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed!");
        }
    };

    return (
        <div className="admin-register-container">
            <h2>Admin Registration</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={admin.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={admin.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={admin.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
