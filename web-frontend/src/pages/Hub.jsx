import React, { useState } from 'react';
import { Bell, User, Star, Check, Dot, Clock, Home, LayoutGrid, Map, Heart, MessageCircle } from 'lucide-react';
import LuvsiLogo from '../assets/LuvsiLogo.png';
import { Link } from 'react-router-dom';


const featureProfiles = [
  { id: 1, status: 'New', icon: Star, color: 'text-yellow-400', img: 'https://placehold.co/150x150/f97316/ffffff?text=N', badgeColor: 'bg-yellow-400' },
  { id: 2, status: 'Online', icon: Dot, color: 'text-green-500', img: 'https://placehold.co/150x150/ef4444/ffffff?text=O', badgeColor: 'bg-green-500' },
  { id: 3, status: 'Verified', icon: Check, color: 'text-blue-500', img: 'https://placehold.co/150x150/3b82f6/ffffff?text=V', badgeColor: 'bg-blue-500' },
  { id: 4, status: 'Active today', icon: Clock, color: 'text-purple-400', img: 'https://placehold.co/150x150/8b5cf6/ffffff?text=A', badgeColor: 'bg-purple-400' },
  { id: 5, status: 'New', icon: Star, color: 'text-yellow-400', img: 'https://placehold.co/150x150/ec4899/ffffff?text=N2', badgeColor: 'bg-yellow-400' },
  { id: 6, status: 'Online', icon: Dot, color: 'text-green-500', img: 'https://placehold.co/150x150/f43f5e/ffffff?text=O2', badgeColor: 'bg-green-500' },
];

const meetCards = [
  { id: 1, title: 'Hiking & Backpack', img: 'https://placehold.co/1080x800/10b981/ffffff?text=Hiking+%26+Backpack' },
  { id: 2, title: 'Art & Museums', img: 'https://placehold.co/1080x800/6366f1/ffffff?text=Art+%26+Museums' },
  { id: 3, title: 'Coffee Enthusiast', img: 'https://placehold.co/1080x800/f59e0b/ffffff?text=Coffee+Enthusiast' },
  { id: 4, title: 'Gourmet Cooking', img: 'https://placehold.co/1080x800/ef4444/ffffff?text=Gourmet+Cooking' },
];


const FeatureProfile = ({ profile }) => {
  const Icon = profile.icon;
  const isOnlineDot = profile.status === 'Online';
  const isNew = profile.status === 'New';

  return (
    <div className="flex flex-col items-center flex-shrink-0 w-24 transition-transform hover:scale-105">
      <div className="relative w-16 h-16">
        <img
          src={profile.img}
          alt={profile.status}
          className={`w-full h-full object-cover rounded-full ${isNew ? 'p-0.5 border-4 border-yellow-400' : 'p-0.5 border-2 border-transparent'}`}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/374151/ffffff?text=User'; }}
        />
        <div
          className={`absolute bottom-0 right-0 p-1 rounded-full border-2 border-gray-900 shadow-lg
            ${isOnlineDot ? 'w-4 h-4' : 'w-5 h-5 flex items-center justify-center'}
            ${profile.badgeColor} text-white`}
        >
          {!isOnlineDot && <Icon size={12} strokeWidth={3} />}
          {isOnlineDot && <span className="sr-only">Online</span>}
        </div>
      </div>
      <span className="mt-2 text-xs font-medium text-gray-200">{profile.status}</span>
    </div>
  );
};

const MeetCard = ({ card }) => (
  <div className="w-[80vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] flex-shrink-0 h-[450px] rounded-xl overflow-hidden shadow-2xl relative group">
    <div
      className="w-full h-full bg-cover bg-center flex items-end p-6 transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${card.img})` }}
    >
      <h3 className="text-xl font-bold text-white bg-black bg-opacity-40 p-2 rounded-lg backdrop-blur-sm">{card.title}</h3>
    </div>
  </div>
);


const Hub = () => {
  const [activePage, setActivePage] = useState('Hub');
  const [activeTab, setActiveTab] = useState('Travel Style');

  const getIconStyle = (pageName) => {
    const isActive = activePage === pageName;
    return `w-6 h-6 transition-colors duration-200 ${isActive ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pb-24">

     <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-800 shadow-md">
  <div className="flex items-center space-x-2">
    <Link to="/" className="flex items-center">
      <img src={LuvsiLogo} alt="Luvsi Logo" className="w-10 h-10 object-contain" />
      <h1 className="text-2xl font-bold text-white ml-2">Luvsi</h1>
    </Link>
  </div>
  <div className="flex items-center space-x-4">
    <Bell size={24} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden cursor-pointer flex items-center justify-center">
      <User size={24} className="text-gray-400" />
    </div>
  </div>
</header>

  
      <main className="px-4 sm:px-6 py-6">

      
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">Featured</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {featureProfiles.map(profile => <FeatureProfile key={profile.id} profile={profile} />)}
          </div>
        </section>

        <hr className="border-gray-700 mb-6" />


        <section>
          <h2 className="text-3xl font-bold mb-4">Meet</h2>
          <div className="flex space-x-3 mb-6">
            {['Travel Style', 'Lifestyle', 'Music Taste'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md
                  ${activeTab === tab ? 'bg-white text-gray-900 border border-gray-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {meetCards.map(card => <MeetCard key={card.id} card={card} />)}
          </div>
        </section>

      
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">New Connections</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 h-32 rounded-lg p-4 flex items-end text-sm font-medium hover:bg-gray-700 transition">Local Discoveries</div>
            <div className="bg-gray-800 h-32 rounded-lg p-4 flex items-end text-sm font-medium hover:bg-gray-700 transition">Trending Now</div>
          </div>
        </section>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
};

export default Hub;
