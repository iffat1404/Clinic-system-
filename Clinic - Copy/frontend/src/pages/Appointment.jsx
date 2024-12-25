import { useState, useEffect } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

function Appointment() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointment');  // Replace with your backend API endpoint
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  // Fetch a single order by ID
  const fetchOrderDetails = async (orderId) => {

    try {
      const response = await axios.get(`http://localhost:3000/api/orders/${orderId}`);  // Replace with your backend API endpoint
      setSelectedOrder(response.data);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to fetch order details');
    }
  };

  // Delete an order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`); 
      setOrders(orders.filter(order => order.order_id !== orderId));
      toast.success('Order deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Appointments</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.order_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.c_fname} {order.c_lname}</div> {/* Adjusted for customer name */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(order.order_date).toLocaleString()}</div> {/* Adjusted date format */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${order.total_amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800' 
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => fetchOrderDetails(order.order_id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEye className="inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.order_id)}
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

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Order Details #{selectedOrder.order_id}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.customer} {selectedOrder.c_lname}</p> {/* Adjusted for customer name */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(selectedOrder.order_date).toLocaleString()}</p> {/* Adjusted date format */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">${selectedOrder.total_amount}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Order Items</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items?.map((item) => ( // Ensure that 'items' exists
                      <tr key={item.product_id}>
                        <td className="py-2">{item.product_name}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2 text-right">${item.price}</td>
                        <td className="py-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedOrder(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
