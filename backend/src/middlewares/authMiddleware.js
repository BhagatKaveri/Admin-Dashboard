import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with a secure secret

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.admin = verified; // Set admin details in request
        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid Token" });
    }
};
