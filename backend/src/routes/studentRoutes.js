import express from "express";
import prisma from "../config/db.js";
import { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "../controllers/studentController.js";
import multer from "multer";
const router = express.Router();



const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/add", upload.single("profileImage"), addStudent);
// router.get("/list", getStudents);
router.get("/detail/:id", getStudentById);
router.put("/edit/:id", upload.single("profileImage"), updateStudent);
router.delete("/delete/:id", deleteStudent);
// router.get("/list", async (req, res) => {
//     const students = await prisma.student.findMany();
//     students.forEach(student => {
//         student.profileImage = `http://localhost:5000/${student.profileImage}`;
//     });
//     res.json(students);
// });
router.get("/list", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        students.forEach(student => {
            if (student.profileImage) {
                student.profileImage = `http://localhost:5000${student.profileImage}`; // ✅ Fix double slash issue
            }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
});


export default router;
