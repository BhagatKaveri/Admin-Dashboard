import React, { useEffect, useState } from "react";
import { getStudentById } from "../../api/studentApi";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            const { data } = await getStudentById(id);
            setStudent(data.student);
        };
        fetchStudent();
    }, [id]);

    return student ? (
        <div>
            <h2>{student.name}</h2>
            <p>Email: {student.email}</p>
            <p>Phone No: {student.phoneNo}</p>
            <p>Qualification: {student.qualification.join(", ")}</p>
            <img src={student.profileImage} alt="Profile" />
        </div>
    ) : null;
};

export default StudentDetails;
