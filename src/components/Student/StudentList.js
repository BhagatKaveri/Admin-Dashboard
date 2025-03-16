import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../api/studentApi";
import { useNavigate } from "react-router-dom";
import "../Layout/studentList.css";
const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const { data } = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div className="student-list-container">
            <div>
                <h2 style={{ textAlign: "center" }}>Student List</h2>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Profile Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>
                                        {student.profileImage ? (
                                            <img
                                                src={student.profileImage}
                                                alt="Profile"
                                                className="profile-img"
                                                onError={(e) => (e.target.style.display = "none")}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNo}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/student/edit-student/${student.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">No students available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
