import express from "express";
import multer from "multer";

// import upload from "../config/multer.js";
import {
    registerAdmin, loginAdmin, getAdminProfile,
    changePassword, forgotPassword, editProfilePicture, getAdminDashboard
} from "../controllers/adminController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authenticateToken, getAdminProfile);
router.put("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/edit-profile-picture", upload.single("profilePicture"), editProfilePicture);
router.get("/dashboard", authenticateToken, getAdminDashboard);

export default router;
