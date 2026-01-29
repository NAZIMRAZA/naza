
import React from 'react';
import { User } from '../types';
import { Users, Mail, Phone, MapPin, Calendar, ShieldCheck } from 'lucide-react';

interface AdminProps {
  users: User[];
}

const Admin: React.FC<AdminProps> = ({ users }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-3 mb-8 border-b pb-6">
        <ShieldCheck size={36} className="text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Secure management for Nazcraft administrators.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 px-8 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold flex items-center">
            <Users size={20} className="mr-2" />
            Registered Users ({users.length})
          </h2>
          <span className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full border border-indigo-400">Real-time Sync Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">User Info</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">Address</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-400 italic">
                    No users registered yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400">ID: {user.id.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <Mail size={14} className="mr-2 text-gray-400" /> {user.email}
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-2 text-gray-400" /> {user.phone}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600 max-w-xs truncate">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-400" /> {user.address}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
