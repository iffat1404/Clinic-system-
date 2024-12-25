create database dbms_dentalclinic;
use dbms_dentalclinic;

CREATE TABLE Patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_number VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE Treatment (
    treatment_id INT AUTO_INCREMENT PRIMARY KEY,
    NameOfTreatment VARCHAR(255) NOT NULL,
    Description TEXT
);
DESCRIBE Treatment;

CREATE TABLE Patient_Treatments (
    patient_treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    treatment_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    status ENUM('Ongoing', 'Completed', 'Cancelled') DEFAULT 'Ongoing',
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (treatment_id) REFERENCES Treatment(treatment_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Treatment;

CREATE TABLE Treatment (
    treatment_id INT AUTO_INCREMENT PRIMARY KEY,
    NameOfTreatment VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE Patient_Treatments (
    patient_treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    treatment_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    status ENUM('Ongoing', 'Completed', 'Cancelled') DEFAULT 'Ongoing',
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (treatment_id) REFERENCES Treatment(treatment_id) ON DELETE CASCADE
);

CREATE TABLE Appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
);

CREATE TABLE Bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('Paid', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
);

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('Cash', 'Card', 'Insurance') NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES Bills(bill_id) ON DELETE CASCADE
);

CREATE TABLE Dentist (
    dentist_id INT PRIMARY KEY AUTO_INCREMENT,
    d_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    d_phnno VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
