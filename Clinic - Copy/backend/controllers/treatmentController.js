import db from "../config/db.js";

// 1. Get all Treatment
export const getCategories = (req, res) => {
    const query = "SELECT * FROM Treatment";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Server error", error: err.message });
        }
        res.status(200).json(results);
    });
};


// 2. Add a new Treatment
export const addCategory = (req, res) => {
    const { NameOfTreatment, Description } = req.body;

    // Validate input
    if (!NameOfTreatment) {
        return res.status(400).json({ message: "NameOfTreatment is required" });
    }

    const query = "INSERT INTO Treatment (NameOfTreatment, Description) VALUES (?, ?)";
    db.query(query, [NameOfTreatment, Description], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error", error: err.message });
        }
        res.status(201).json({ 
            message: "Treatment added successfully", 
            treatment_id: result.insertId 
        });
    });
};


// 3. Update a category
export const updateCategory = (req, res) => {
    const { treatment_id } = req.params;
    const { NameOfTreatment, Description } = req.body;

    if (!NameOfTreatment) {
        return res.status(400).json({ message: "NameOfTreatment is required" });
    }

    const query = "UPDATE Treatment SET NameOfTreatment = ?, Description = ? WHERE treatment_id = ?";
    db.query(query, [NameOfTreatment, Description, treatment_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        res.status(200).json({ message: "Treatment updated successfully" });
    });
};

// 4. Delete a category
export const deleteCategory = (req, res) => {
    const { treatment_id } = req.params;

    const query = "DELETE FROM Treatment WHERE treatment_id = ?";
    db.query(query, [treatment_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        res.status(200).json({ message: "Treatment deleted successfully" });
    });
};
