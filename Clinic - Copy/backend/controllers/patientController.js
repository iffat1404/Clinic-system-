import db from "../config/db.js";

// Get all treatments (for the dropdown)
export const getTreatments = (req, res) => {
    const query = 'SELECT * FROM Treatment'; // Fetch all treatments from the Treatment table
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch treatments' });
        res.status(200).json(results); // Send the treatments as a response
    });
};

// Get all patients with their treatments
export const getAllPatients = (req, res) => {
    const query = `
        SELECT p.patient_id, p.first_name, p.last_name, p.contact_number, 
               TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()) AS age,
               t.NameOfTreatment, pt.start_date, pt.end_date, pt.status
        FROM Patients p
        JOIN Patient_Treatments pt ON p.patient_id = pt.patient_id
        JOIN Treatment t ON pt.treatment_id = t.treatment_id
        ORDER BY p.patient_id, pt.start_date;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Failed to fetch patients" });
        res.status(200).json(results);
    });
};

// Get a specific patient's details
export const getPatientById = (req, res) => {
    const { patient_id } = req.params;

    const query = `
        SELECT p.patient_id, p.first_name, p.last_name, p.contact_number, 
               TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()) AS age,
               t.NameOfTreatment, pt.start_date, pt.end_date, pt.status
        FROM Patients p
        JOIN Patient_Treatments pt ON p.patient_id = pt.patient_id
        JOIN Treatment t ON pt.treatment_id = t.treatment_id
        WHERE p.patient_id = ?
        ORDER BY pt.start_date;
    `;

    db.query(query, [patient_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Failed to fetch patient" });
        if (!results.length) return res.status(404).json({ message: "Patient not found" });

        res.status(200).json(results);
    });
};

// Add a new patient
export const addPatient = (req, res) => {
    const { first_name, last_name, contact_number, date_of_birth, treatment_id } = req.body;

    // Add a new patient and associate a treatment
    const query = `
        INSERT INTO Patients (first_name, last_name, contact_number, date_of_birth)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [first_name, last_name, contact_number, date_of_birth], (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to add patient" });
        
        // After inserting the patient, insert a corresponding record in the Patient_Treatments table
        const patient_id = result.insertId; // Get the patient ID of the newly inserted patient

        const patientTreatmentQuery = `
            INSERT INTO Patient_Treatments (patient_id, treatment_id, start_date, status)
            VALUES (?, ?, NOW(), 'Ongoing')
        `;

        db.query(patientTreatmentQuery, [patient_id, treatment_id], (err) => {
            if (err) return res.status(500).json({ message: "Failed to associate treatment" });
            res.json({ message: "Patient added successfully" });
        });
    });
};

// Delete a patient
export const deletePatient = (req, res) => {
    const { patient_id } = req.params;

    const query = "DELETE FROM Patients WHERE patient_id = ?";

    db.query(query, [patient_id], (err) => {
        if (err) return res.status(500).json({ message: "Failed to delete patient" });
        res.json({ message: "Patient deleted successfully" });
    });
};

// Update a patient's information
export const updatePatient = (req, res) => {
    const { patient_id } = req.params;
    const { first_name, last_name, contact_number, date_of_birth } = req.body;

    const query = `
        UPDATE Patients 
        SET first_name = ?, last_name = ?, contact_number = ?, date_of_birth = ? 
        WHERE patient_id = ?
    `;

    db.query(query, [first_name, last_name, contact_number, date_of_birth, patient_id], (err) => {
        if (err) return res.status(500).json({ message: "Failed to update patient" });
        res.json({ message: "Patient updated successfully" });
    });
};
