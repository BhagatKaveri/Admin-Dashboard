import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import "../Layout/AdminDashboard.css"

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please login again.");
                    setTimeout(() => navigate("/"), 2000);
                    return;
                }

                // Fetch admin data
                const response = await getAdminDashboard(token);
                console.log("Admin Data:", response.data);

                setAdmin(response.data);
            } catch (error) {
                console.error("Error fetching admin dashboard data:", error.response?.data || error.message);
                setError("Failed to fetch dashboard data.");
            }
        };

        fetchAdminData();
    }, [navigate]);

    if (error) {
        return <p style={{ color: "red", fontSize: "18px" }}>{error}</p>;
    }

    if (!admin) {
        return <p style={{ fontSize: "18px" }}>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2>Welcome, {admin.name}!</h2>

            {/* Profile Image with Debugging Log & Error Handling */}
            <div style={styles.imageContainer}>
                {admin.profilePicture ? (
                    <>
                        {console.log("Profile Image URL:", admin.profilePicture)}
                        <img
                            src={`http://localhost:5000/${admin.profilePicture}`}
                            alt="Admin Profile"
                            width="100"
                            height="100"
                            style={styles.profileImage}
                            onError={(e) => (e.target.style.display = "none")} // Hide broken images
                        />
                    </>
                ) : (
                    <span style={{ fontSize: "16px", color: "gray" }}>No Image</span>
                )}
            </div>

            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Last Login:</strong> {new Date(admin.lastLogin).toLocaleString()}</p>

            {/* Logout Button */}
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
            }} style={styles.logoutButton}>Logout</button>
        </div>
    );
};

// ✅ CSS Styles
const styles = {
    container: {
        textAlign: "center",
        marginTop: "35rem",
        marginBottom: "25rem",
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "15px",
    },
    profileImage: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #007bff",
    },
    logoutButton: {
        marginTop: "20px",
        padding: "10px 15px",
        background: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default AdminDashboard;
