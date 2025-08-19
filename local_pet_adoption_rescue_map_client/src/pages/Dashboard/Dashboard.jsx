import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminDashboard from './AdminDashboard';
import AdopterDashboard from './AdopterDashboard';
import RescuerDashboard from './RescuerDashboard';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('adopter');
  const [loading, setLoading] = useState(true);
  const { currentUser, getUserRole } = useAuth();

  useEffect(() => {
    const loadUserRole = async () => {
      if (currentUser) {
        try {
          const role = await getUserRole(currentUser.uid);
          setUserRole(role);
        } catch (error) {
          console.error('Error loading user role:', error);
          setUserRole('adopter');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserRole();
  }, [currentUser, getUserRole]);

  if (!currentUser || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'rescuer':
      return <RescuerDashboard />;
    case 'adopter':
    default:
      return <AdopterDashboard />;
  }
};

export default Dashboard; 