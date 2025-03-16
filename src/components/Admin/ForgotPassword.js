import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/adminApi";
import "../Layout/forget.css";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: "", newPassword: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await forgotPassword(formData);
            alert(response.data.message);
            setFormData({ email: "", newPassword: "" });
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Forgot Password</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
