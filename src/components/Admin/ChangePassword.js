import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/adminApi";
import "../Layout/changePass.css";

const ChangePassword = () => {
    const [form, setForm] = useState({ email: "", oldPassword: "", newPassword: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const response = await changePassword(form);
            setSuccess(response.data.message);
            setForm({ email: "", oldPassword: "", newPassword: "" });
            setTimeout(() => navigate("/admin/login"), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Error changing password");
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Change Password</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="oldPassword" type="password" placeholder="Old Password" value={form.oldPassword} onChange={handleChange} required />
                <input name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} required />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
