import express from "express";
import {
    getAllPatients,
    getPatientById,
    addPatient,
    deletePatient,
    updatePatient,
    getTreatments
} from "../controllers/patientController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all patients
router.get("/", getAllPatients);

// Get a specific patient by ID
router.get("/:patient_id", getPatientById);

// Add a new patient
router.post("/", addPatient);

// Delete a patient
router.delete("/:patient_id", deletePatient);

// Update a patient's details
router.put("/:patient_id", updatePatient);

router.get('/treatments', getTreatments);

export default router;
