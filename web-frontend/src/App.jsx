import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Hub from './pages/Hub';
import Footer from './component/Footer';
import Products from './pages/Products';
import Learn from './pages/Learn';
import Safety from './pages/Safety';
import Support from './pages/Support';
import Download from '../src/pages/Download'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
        
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/support" element={<Support />} />
          <Route path="/download" element={<Download />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/hub" element={<Hub />} />
        </Routes>
        <footer className="mt-auto w-full">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
