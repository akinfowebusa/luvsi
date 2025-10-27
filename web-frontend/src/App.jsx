import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/pages/HomePage'
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Hub from './pages/Hub';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path='admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='hub' element={<Hub/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
