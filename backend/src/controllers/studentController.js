import prisma from "../config/db.js";
import bcrypt from "bcryptjs";

// export const addStudent = async (req, res) => {
//     const { name, email, password, phoneNo, qualification, gender } = req.body;
//     const profileImage = req.file ? req.file.path : null;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newStudent = await prisma.student.create({
//             data: { name, email, password: hashedPassword, phoneNo, qualification, gender, profileImage },
//         });

//         res.json({ message: "Student added", student: newStudent });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };
export const addStudent = async (req, res) => {
    const { name, email, password, phoneNo, qualification, gender } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Convert qualification to array (if sent as a JSON string)
        const qualifications = typeof qualification === "string" ? JSON.parse(qualification) : qualification;

        // ✅ Ensure Prisma instance is working
        const newStudent = await prisma.student.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phoneNo,
                qualification: qualifications,
                gender,
                profileImage
            },
        });

        res.json({ message: "Student added successfully", newStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await prisma.student.findMany({
            select: { id: true, name: true, email: true, phoneNo: true },
        });
        res.json({ students });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await prisma.student.findUnique({ where: { id: req.params.id } });
        res.json({ student });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// export const updateStudent = async (req, res) => {
//     const { name, email, password, phoneNo, qualification, gender } = req.body;
//     const profileImage = req.file ? req.file.path : null;

//     try {
//         const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//         const updatedStudent = await prisma.student.update({
//             where: { id: req.params.id },
//             data: { name, email, password: hashedPassword, phoneNo, qualification, gender, profileImage },
//         });

//         res.json({ message: "Student updated", student: updatedStudent });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };


export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phoneNo, qualification, gender } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        console.log("🔹 Updating student with ID:", id);
        console.log("📩 Received data:", req.body);
        if (req.file) console.log("📂 Uploaded file:", req.file.filename);

        // 🔹 Check if student exists
        const existingStudent = await prisma.student.findUnique({ where: { id } });
        if (!existingStudent) {
            console.error("❌ Student not found!");
            return res.status(404).json({ error: "Student not found" });
        }

        console.log("📌 Existing student data:", existingStudent);

        // 🔹 Handle profile image replacement
        if (profileImage && existingStudent.profileImage) {
            const oldImagePath = `.${existingStudent.profileImage}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log("✅ Deleted old profile image:", oldImagePath);
            }
        }

        // 🔹 Hash new password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : existingStudent.password;

        // 🔹 Fix qualification parsing issue
        let parsedQualification;
        if (Array.isArray(qualification)) {
            parsedQualification = qualification; // Already an array
        } else {
            try {
                parsedQualification = JSON.parse(qualification);
                if (!Array.isArray(parsedQualification)) {
                    throw new Error("Qualification is not an array");
                }
            } catch (err) {
                console.error("❌ Error parsing qualification:", err);
                return res.status(400).json({ error: "Invalid qualification format. Expected an array." });
            }
        }

        // 🔹 Ensure qualification is an array (even if empty)
        parsedQualification = parsedQualification || [];

        // 🔹 Update student
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                name,
                email,
                password: hashedPassword,
                phoneNo,
                qualification: parsedQualification,
                gender,
                profileImage: profileImage || existingStudent.profileImage,
            },
        });

        console.log("✅ Student updated successfully:", updatedStudent);
        res.json({ message: "Student updated successfully", student: updatedStudent });

    } catch (error) {
        console.error("❌ Error updating student:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};


export const deleteStudent = async (req, res) => {
    try {
        await prisma.student.delete({ where: { id: req.params.id } });
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
