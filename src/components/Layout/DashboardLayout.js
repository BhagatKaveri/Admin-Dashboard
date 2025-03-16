import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./dashboard.css";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminName, setAdminName] = useState(""); // State to store admin name
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert to boolean

        // Fetch admin details if logged in
        if (token) {
            const storedAdmin = JSON.parse(localStorage.getItem("adminData"));
            if (storedAdmin && storedAdmin.name) {
                setAdminName(storedAdmin.name);
            }
        }
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("adminData"); // Clear admin data
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <h2>Admin Panel</h2>
                <ul>
                    <li>
                        <Link to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
                    </li>
                    <li>
                        <button
                            className="profile-menu-toggle"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        >
                            Admin Profile
                        </button>
                        {isProfileMenuOpen && (
                            <ul className="submenu">
                                <li>
                                    <Link to="/admin/forgot-password" onClick={() => setIsSidebarOpen(false)}>Forgot Password</Link>
                                </li>
                                <li>
                                    <Link to="/admin/change-password" onClick={() => setIsSidebarOpen(false)}>Change Password</Link>
                                </li>
                                <li>
                                    <Link to="/admin/edit-profile-picture" onClick={() => setIsSidebarOpen(false)}>Edit Profile Picture</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/student/" onClick={() => setIsSidebarOpen(false)}>Student List</Link>
                    </li>
                    <li>
                        <Link to="/student/add-student" onClick={() => setIsSidebarOpen(false)}>Add Student</Link>
                    </li>

                    {/* Show Logout or Login Button */}
                    <li>
                        {isLoggedIn ? (
                            <button className="logout" onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to="/" className="login-btn">Login</Link>
                        )}
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="navbar">
                    {/* Mobile Menu Button */}
                    <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <FaBars />
                    </button>

                    {/* Admin Dashboard Title */}
                    <h2 className="dashboard-title">Admin Dashboard {adminName && `- ${adminName}`}</h2>

                    {/* My Profile Link */}
                    <div>
                        {/* <Link to="/admin/dashboard">My Profile</Link> */}
                    </div>
                </nav>

                {/* Page Content */}
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
