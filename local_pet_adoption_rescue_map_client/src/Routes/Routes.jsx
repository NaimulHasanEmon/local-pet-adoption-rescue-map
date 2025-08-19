import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Layout
import Main from '../Layout/Main/Main';

// Public Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import BrowsePets from '../pages/BrowsePets/BrowsePets';
import PetProfile from '../pages/PetProfile/PetProfile';

// Auth Pages
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';

// Protected Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import AdopterDashboard from '../pages/Dashboard/AdopterDashboard';
import RescuerDashboard from '../pages/Dashboard/RescuerDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Favorites from '../pages/Favorites/Favorites';
import PetSubmission from '../pages/PetSubmission/PetSubmission';
import MapView from '../pages/MapView/MapView';

// Error Page
import Error from '../pages/Error/Error';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="browse" element={<BrowsePets />} />
        <Route path="pet/:id" element={<PetProfile />} />
        <Route path="map" element={<MapView />} />
        
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route path="dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="adopter-dashboard" element={
          <PrivateRoute requiredRole="adopter">
            <AdopterDashboard />
          </PrivateRoute>
        } />
        
        <Route path="rescuer-dashboard" element={
          <PrivateRoute requiredRole="rescuer">
            <RescuerDashboard />
          </PrivateRoute>
        } />
        
        <Route path="admin-dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        
        <Route path="favorites" element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        } />
        
        <Route path="submit-pet" element={
          <PrivateRoute requiredRole="rescuer">
            <PetSubmission />
          </PrivateRoute>
        } />
        
        {/* Error Route */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 