import { useState } from "react";
import { editProfilePicture } from "../../api/adminApi";
import "../Layout/editProfilePicture.css";

const EditProfilePicture = () => {
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!file) {
            setError("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("profilePicture", file);

        try {
            const response = await editProfilePicture(formData);
            setSuccess(response.data.message);
            setEmail("");
            setFile(null);
        } catch (error) {
            setError("Error updating profile picture.");
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Edit Profile Picture</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input type="file" name="profilePicture" onChange={handleFileChange} required />
                <button type="submit">Update Profile Picture</button>
            </form>
        </div>
    );
};

export default EditProfilePicture;
