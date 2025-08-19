import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { currentUser, getUserRole } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = getUserRole(currentUser.uid);
  
  return userRole === 'admin' ? children : <Navigate to="/dashboard" replace />;
};

export default AdminRoute; 