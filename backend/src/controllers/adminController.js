import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

const SECRET_KEY = "your_secret_key";

// ✅ Admin Registration
export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await prisma.admin.findUnique({ where: { email } });
        if (existingAdmin) return res.status(400).json({ error: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: { name, email, password: hashedPassword }
        });

        res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(401).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, { expiresIn: "2h" });

        // 🔹 Update last login timestamp
        await prisma.admin.update({
            where: { email },
            data: { lastLogin: new Date() }
        });

        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                profilePicture: admin.profilePicture,
                lastLogin: admin.lastLogin,
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
};
export const getAdminDashboard = async (req, res) => {
    const { id } = req.admin; // Extracted from JWT

    try {
        const admin = await prisma.admin.findUnique({
            where: { id },
            select: {
                name: true,
                email: true,
                profilePicture: true,
                lastLogin: true,
                createdAt: true
            },
        });

        if (!admin) return res.status(404).json({ error: "Admin not found" });

        res.json(admin);
    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
};



// ✅ Get Admin Profile
export const getAdminProfile = async (req, res) => {
    const { email } = req.query;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        res.json(admin);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};

// ✅ Change Password
export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect old password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.admin.update({ where: { email }, data: { password: hashedPassword } });

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ error: "Password change failed" });
    }
};

// ✅ Forgot Password (Reset)
export const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.admin.update({ where: { email }, data: { password: hashedPassword } });

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Password reset failed" });
    }
};

// ✅ Edit Profile Picture
export const editProfilePicture = async (req, res) => {
    const { email } = req.body;
    const profilePicture = req.file ? req.file.path.replace("\\", "/") : null;
    try {
        if (!profilePicture) return res.status(400).json({ error: "No file uploaded" });

        // Get current profile picture to delete the old one
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        // Delete old profile picture if exists
        if (admin.profilePicture) {
            const oldImagePath = `./${admin.profilePicture}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update new profile picture
        const updatedAdmin = await prisma.admin.update({
            where: { email },
            data: { profilePicture }
        });

        res.json({ message: "Profile picture updated successfully", admin: updatedAdmin });
    } catch (error) {
        console.error("Profile Picture Update Error:", error);
        res.status(500).json({ error: "Profile picture update failed" });
    }
};
