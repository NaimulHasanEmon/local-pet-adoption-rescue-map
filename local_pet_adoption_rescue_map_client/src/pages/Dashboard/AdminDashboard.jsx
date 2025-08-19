import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Welcome, {currentUser?.displayName || currentUser?.email}!
              </p>
              <p className="text-gray-500 mb-8">
                Manage the platform and oversee all rescue operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p className="text-gray-600">Manage users and permissions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Pet Oversight</h3>
                  <p className="text-gray-600">Monitor all pet listings</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Reports</h3>
                  <p className="text-gray-600">View platform analytics</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">System Settings</h3>
                  <p className="text-gray-600">Configure platform settings</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 