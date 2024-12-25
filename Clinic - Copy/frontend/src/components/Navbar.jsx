import { FiMenu, FiUser } from 'react-icons/fi';
import Logo from '../assets/Logo.jpg';
function Navbar({ onMenuClick }) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <img 
              src={Logo} 
              alt="Dentist Logo" 
              className="h-12 w-10 mr-2"
            />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
              DentCare
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="p-2 rounded-full bg-gray-100">
                <FiUser className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;