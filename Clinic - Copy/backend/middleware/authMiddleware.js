import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  // Token is expected to be in the cookies
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.adminId = decoded.id; // Store the admin id from the decoded token
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
