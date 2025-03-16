import React, { useState } from "react";
import { addStudent } from "../../api/studentApi";
import { useNavigate } from "react-router-dom";
import "../Layout/studentAdd.css";

const StudentAdd = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        qualification: [],
        gender: "",
        profileImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "qualification") {
            const value = e.target.checked
                ? [...formData.qualification, e.target.value]
                : formData.qualification.filter(q => q !== e.target.value);
            setFormData({ ...formData, qualification: value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "qualification") {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value);
            }
        });

        await addStudent(data);
        navigate("/student");
    };

    return (
        <div className="form-container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phoneNo" placeholder="Phone No." onChange={handleChange} required />

                <div className="checkbox-group">
                    <label>Qualification:</label>
                    <label>
                        <input type="checkbox" name="qualification" value="BSc" onChange={handleChange} /> BSc
                    </label>
                    <label>
                        <input type="checkbox" name="qualification" value="MSc" onChange={handleChange} /> MSc
                    </label>
                    <label>
                        <input type="checkbox" name="qualification" value="PhD" onChange={handleChange} /> PhD
                    </label>
                </div>

                <select name="gender" onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input type="file" accept="image/*" onChange={handleImageChange} required />
                {imagePreview && <img src={imagePreview} alt="Preview" width="100" height="100" />}

                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default StudentAdd;
