import { useEffect, useState } from "react";
import { getAdminProfile } from "../../api/adminApi";

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const email = localStorage.getItem("adminEmail"); // Retrieve email from local storage
            if (!email) {
                alert("No admin logged in");
                return;
            }

            try {
                const response = await getAdminProfile(email);
                setAdmin(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!admin) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Admin Profile</h2>
            <p>Name: {admin.name}</p>
            <p>Email: {admin.email}</p>
            {admin.profilePicture && (
                <img
                    src={`http://localhost:5000/${admin.profilePicture}`}
                    alt="Profile"
                    width="100"
                    onError={(e) => e.target.style.display = "none"} // Hide if not found
                />
            )}
        </div>
    );
};

export default AdminProfile;
