import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Patient() {
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_number: '',
    date_of_birth: '',
    treatment_id: ''
  });

  // Fetch all treatments to populate the dropdown
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/treatments');
        if (!response.ok) {
          throw new Error('Failed to fetch treatments');
        }
        const data = await response.json();
        setTreatments(data);  // Assuming the response contains an array of treatment objects
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTreatments();
  }, []);

  // Fetch all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        setPatients(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPatients();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      const newPatient = await response.json();
      setPatients((prevPatients) => [...prevPatients, newPatient]);
      toast.success('Patient added successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        contact_number: '',
        date_of_birth: '',
        treatment_id: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle patient deletion
  const handleDelete = async (patient_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patient_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }

      setPatients((prevPatients) => prevPatients.filter((patient) => patient.patient_id !== patient_id));
      toast.success('Patient deleted successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          Add Patient
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Treatments
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.patient_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {patient.first_name} {patient.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.age} years</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.contact_number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.NameOfTreatment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(patient.patient_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new patient */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="First Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Last Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                placeholder="Contact Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                placeholder="Date of Birth"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <select
                name="treatment_id"
                value={formData.treatment_id}
                onChange={(e) => setFormData({ ...formData, treatment_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Treatment</option>
                {treatments.map((treatment) => (
                  <option key={treatment.treatment_id} value={treatment.treatment_id}>
                    {treatment.NameOfTreatment}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patient;
