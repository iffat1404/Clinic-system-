import { FiUsers, FiBox, FiShoppingBag, FiDollarSign } from 'react-icons/fi';

function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    {
      title: 'Total Patients',
      value: '15',
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Appointments',
      value: '14',
      icon: FiBox,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Appointments',
      value: '7',
      icon: FiShoppingBag,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: 'Rs 1,345',
      icon: FiDollarSign,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white ">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
}

export default Dashboard;