import React, { useEffect, useState } from "react";
import { getStudentById, updateStudent } from "../../api/studentApi";
import { useNavigate, useParams } from "react-router-dom";
import "../Layout/studentEdit.css";

const StudentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        qualification: [],
        gender: "",
        profileImage: null,
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const { data } = await getStudentById(id);
                setFormData({ ...data.student, qualification: data.student.qualification || [] });
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleQualificationChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            qualification: checked
                ? [...prevData.qualification, value]
                : prevData.qualification.filter((q) => q !== value),
        }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append("name", formData.name);
        updatedData.append("email", formData.email);
        updatedData.append("password", formData.password);
        updatedData.append("phoneNo", formData.phoneNo);
        updatedData.append("gender", formData.gender);
        updatedData.append("qualification", JSON.stringify(formData.qualification));
        if (formData.profileImage) {
            updatedData.append("profileImage", formData.profileImage);
        }

        await updateStudent(id, updatedData);
        navigate("/student");
    };

    return (
        <div className="student-edit-container">
            <form className="student-edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 style={{ textAlign: "center" }}>Edit Student</h2>

                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />

                <label>Phone No.:</label>
                <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />

                <label>Qualification:</label>
                <div className="qualification-group">
                    <label>
                        <input
                            type="checkbox"
                            value="Bachelors"
                            checked={formData.qualification.includes("Bachelors")}
                            onChange={handleQualificationChange}
                        />
                        Bachelors
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Masters"
                            checked={formData.qualification.includes("Masters")}
                            onChange={handleQualificationChange}
                        />
                        Masters
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="PhD"
                            checked={formData.qualification.includes("PhD")}
                            onChange={handleQualificationChange}
                        />
                        PhD
                    </label>
                </div>

                <label>Gender:</label>
                <div className="gender-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === "Other"}
                            onChange={handleChange}
                        />
                        Other
                    </label>
                </div>

                <label>Profile Image:</label>
                <input type="file" name="profileImage" onChange={handleFileChange} accept="image/*" />

                <button className="update-btn" type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default StudentEdit;
