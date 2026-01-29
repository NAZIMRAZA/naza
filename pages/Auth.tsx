
import React, { useState } from 'react';
import { User, AuthState } from '../types';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Mail, Lock, Phone, MapPin, User as UserIcon, Loader2, CheckCircle } from 'lucide-react';

interface AuthProps {
  setAuthState: (state: AuthState) => void;
  setAllUsers: (updater: (prev: User[]) => User[]) => void;
}

const Auth: React.FC<AuthProps> = ({ setAuthState, setAllUsers }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Process
    setTimeout(() => {
      if (isLogin) {
        // Mock Admin credentials
        const isAdmin = formData.email === 'admin@nazcorp.tech' && formData.password === 'admin123';
        
        const existingUsers = JSON.parse(localStorage.getItem('nazcraft_users') || '[]');
        const foundUser = existingUsers.find((u: User) => u.email === formData.email);

        if (isAdmin || foundUser) {
           const user: User = isAdmin ? {
            id: 'admin-1',
            name: 'Nazcorp Admin',
            email: 'admin@nazcorp.tech',
            phone: 'N/A',
            address: 'Headquarters',
            role: 'admin',
            createdAt: new Date().toISOString()
          } : foundUser;

          setAuthState({ user, isAuthenticated: true, isAdmin: user.role === 'admin' });
          navigate('/');
        } else {
          alert("Invalid credentials or user not found.");
        }
      } else {
        // Handle Signup logic with "Verification" step
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match!");
          setIsLoading(false);
          return;
        }
        setIsVerifying(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleVerify = () => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    setAllUsers((prev) => [...prev, newUser]);
    setAuthState({ user: newUser, isAuthenticated: true, isAdmin: false });
    setIsVerifying(false);
    navigate('/');
  };

  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={40} className="animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Verify Your Email</h2>
          <p className="text-gray-600 mb-8">We've sent a simulated verification code to <strong>{formData.email}</strong>. Click below to confirm your identity.</p>
          <button 
            onClick={handleVerify}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg"
          >
            <CheckCircle size={20} />
            <span>Verify & Log In</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500 mt-2">{isLogin ? 'Enter your details to access Nazcraft' : 'Join Nazcorp and start building sites'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg transform active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : isLogin ? (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-400 leading-tight">
            <p className="font-bold mb-1">Demo Access:</p>
            <p>Admin: admin@nazcorp.tech / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
