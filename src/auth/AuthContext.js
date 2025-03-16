import { createContext, useState, useEffect } from "react";
import { loginAdmin } from "../api/adminApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null);

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(admin));
    }, [admin]);

    const login = async (email, password) => {
        try {
            const response = await loginAdmin({ email, password });
            setAdmin(response.data.admin);
        } catch (error) {
            console.error("Login failed:", error.response.data.error);
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("admin");
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
