import express from 'express';
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/treatmentController.js";
import { getTreatments } from "../controllers/patientController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:treatment_id", updateCategory);
router.delete("/:treatment_id", deleteCategory);
router.get("/", getTreatments);
export default router;
