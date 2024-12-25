import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiShoppingBag, FiList, FiX } from 'react-icons/fi';
import { ImTable2 , ImUser} from "react-icons/im";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  
  const links = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/treatment', icon: FiList, label: 'Treatments' },
    { path: '/patients', icon: FiBox, label: 'Patient' },
    { path: '/appointment', icon: ImTable2 , label: 'Appointment' },
  ];

  const baseStyle = "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100";
  const activeStyle = "bg-gray-100";

  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
          >
            <FiX className="w-6 h-6" />
          </button>
          <ul className="space-y-2 font-medium">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${baseStyle} ${
                    location.pathname === link.path ? activeStyle : ''
                  }`}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 sm:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default Sidebar;