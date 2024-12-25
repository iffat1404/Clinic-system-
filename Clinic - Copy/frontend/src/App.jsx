import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Treatment from './pages/Treatment';
import Appointment from './pages/Appointment';
import Patient from './pages/Patient';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="treatment" element={<Treatment />} />
          <Route path="patients" element={<Patient />} />
          <Route path="appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;