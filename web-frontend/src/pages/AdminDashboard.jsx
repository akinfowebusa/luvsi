import React, { useState } from 'react';
import { FaBell, FaSearch, FaHome, FaUserFriends, FaHeart, FaComment, FaChartBar, FaCog } from 'react-icons/fa';

const sidebarNav = [
  { label: 'Dashboard', icon: <FaHome /> },
  { label: 'Users', icon: <FaUserFriends /> },
  { label: 'Matches', icon: <FaHeart /> },
  { label: 'Messages', icon: <FaComment /> },
  { label: 'Reports', icon: <FaChartBar /> },
  { label: 'Settings', icon: <FaCog /> },
];

const metrics = [
  { title: 'Total Users', value: 1200, change: '+5%' },
  { title: 'Active Today', value: 430, change: '+3%' },
  { title: 'Matches Today', value: 112, change: '+7%' },
  { title: 'Reported Users', value: 5, change: '-2%' },
];

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">

      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div className="text-2xl font-bold text-pink-700 mb-8">Luvsi Admin</div>
        <nav className="flex-1">
          {sidebarNav.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition 
                ${activeItem === item.label ? 'bg-pink-700 text-white' : 'text-gray-700 hover:bg-purple-100'}
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
   
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-800">Hello, Admin</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 outline-none border-none"
              />
            </div>
            <div className="relative">
              <FaBell className="text-gray-600 text-xl cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full relative">
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Admin Name</div>
                <div className="text-xs text-green-500">Online</div>
              </div>
            </div>
          </div>
        </header>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow">
              <div className="text-gray-500 text-sm">{metric.title}</div>
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className={`font-medium ${metric.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Latest Users</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 border-b text-gray-500">Name</th>
                  <th className="py-2 border-b text-gray-500">Email</th>
                  <th className="py-2 border-b text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2">John Doe</td>
                  <td className="py-2">john@example.com</td>
                  <td className="py-2 text-green-500">Active</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2">Jane Smith</td>
                  <td className="py-2">jane@example.com</td>
                  <td className="py-2 text-green-500">Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Matches Overview</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Matches Today</span>
                <span className="font-semibold">112</span>
              </li>
              <li className="flex justify-between">
                <span>Total Matches</span>
                <span className="font-semibold">3,450</span>
              </li>
              <li className="flex justify-between">
                <span>Pending Requests</span>
                <span className="font-semibold text-yellow-500">8</span>
              </li>
            </ul>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8">
          © 2025 Luvsi. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
