import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

function Treatment() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treatment');  // Update this URL if needed
      setCategories(response.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editingCategory) {
            // Update treatment
            await axios.put(`http://localhost:5000/api/treatment/${editingCategory.treatment_id}`, {
                NameOfTreatment: formData.name,
                Description: formData.description,
            });
            toast.success('Treatment updated successfully!');
        } else {
            // Add new treatment
            await axios.post('http://localhost:5000/api/treatment', {
                NameOfTreatment: formData.name,
                Description: formData.description,
            });
            toast.success('Treatment added successfully!');
        }
        fetchCategories(); // Refresh treatments after operation
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong');
    }
};

const handleEdit = (category) => {
  setEditingCategory(category);
  setFormData({ 
      name: category.NameOfTreatment, 
      description: category.Description 
  });
  setIsModalOpen(true);
};

const handleDelete = async (treatment_id) => {
  try {
      await axios.delete(`http://localhost:5000/api/treatment/${treatment_id}`);
      toast.success('Treatment deleted successfully!');
      fetchCategories(); // Refresh treatments after deletion
  } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete treatment');
  }
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Treatments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          Add Treatment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
  {categories.map((category) => (
    <tr key={category.treatment_id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {category.NameOfTreatment}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {category.Description}
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button
          onClick={() => handleEdit(category)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <FiEdit2 className="inline" />
        </button>
        <button
          onClick={() => handleDelete(category.treatment_id)}
          className="text-red-600 hover:text-red-900"
        >
          <FiTrash2 className="inline" />
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {editingCategory ? 'Edit Treatment' : 'Add Treatment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      required
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
  <div className="flex justify-end space-x-3">
    <button
      type="button"
      onClick={() => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
      }}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
    >
      {editingCategory ? 'Update' : 'Add'}
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Treatment;
