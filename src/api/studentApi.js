import axios from "axios";

const API_URL = "http://localhost:5000/api/student";

export const addStudent = (formData) => axios.post(`${API_URL}/add`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const getStudents = () => axios.get(`${API_URL}/list`);
export const getStudentById = (id) => axios.get(`${API_URL}/detail/${id}`);
export const updateStudent = (id, formData) =>
    axios.put(`${API_URL}/edit/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteStudent = (id) => axios.delete(`${API_URL}/delete/${id}`);
