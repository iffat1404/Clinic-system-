import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar/>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="p-4 sm:ml-64 mt-16">
        <div className="p-4 rounded-lg bg-black shadow-md">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
