import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"; // Fixed import
import db from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost";

// Enable CORS
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/patients", patientRoutes); // Fixed route
app.use("/api/treatment", categoryRoutes);
// app.use("/api/orders", orderRoutes); // Uncomment if orders are implemented

// Database Connection Check
db.connect((err) => {
    if (err) console.error("Database connection failed:", err.message);
    else console.log("Connected to MySQL database");
});

// Start Server
app.listen(PORT, () =>
    console.log(`Server running at ${HOST}:${PORT}`)
);
