
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { User, AuthState } from './types';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import { LayoutDashboard, Info, Briefcase, Mail, UserCircle, LogOut, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('nazcraft_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false, isAdmin: false };
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nazcraft_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nazcraft_auth', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('nazcraft_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const handleLogout = () => {
    setAuthState({ user: null, isAuthenticated: false, isAdmin: false });
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 glass border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Nazcraft
                </span>
              </div>
              
              <div className="hidden md:flex space-x-8 font-medium text-gray-600">
                <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <LayoutDashboard size={18} /> <span>Home</span>
                </Link>
                <Link to="/about" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <Info size={18} /> <span>About</span>
                </Link>
                <Link to="/service" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <Briefcase size={18} /> <span>Service</span>
                </Link>
                <Link to="/contact" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <Mail size={18} /> <span>Contact</span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                {authState.isAdmin && (
                  <Link to="/admin" className="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100">
                    <ShieldCheck size={20} />
                  </Link>
                )}
                {authState.isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">Hi, {authState.user?.name}</span>
                    <button onClick={handleLogout} className="flex items-center space-x-1 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link to="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center space-x-2">
                    <UserCircle size={18} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service isAuthenticated={authState.isAuthenticated} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth setAuthState={setAuthState} setAllUsers={setAllUsers} />} />
            <Route path="/admin" element={authState.isAdmin ? <Admin users={allUsers} /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold">Nazcraft by Nazcorp</span>
              <p className="mt-4 text-gray-400 max-w-md">
                Empowering businesses and individuals with AI-driven web solutions. 
                Build, view, and deploy in seconds.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/service">Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@nazcorp.tech</li>
                <li>+1 234 567 890</li>
                <li>Silicon Valley, CA</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2024 Nazcorp. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
