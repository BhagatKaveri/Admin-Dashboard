import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const registerAdmin = (data) => axios.post(`${API_URL}/register`, data);

export const loginAdmin = async (adminData) => {
    return await axios.post(`${API_URL}/login`, adminData);
};

export const getAdminDashboard = async (token) => {
    return await axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
export const getAdminProfile = async (email) => {
    return axios.get(`${API_URL}/profile`, { params: { email } });
}; export const changePassword = (data) => axios.put(`${API_URL}/change-password`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const editProfilePicture = (formData) => axios.put(`${API_URL}/edit-profile-picture`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
});
