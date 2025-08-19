import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { AuthContext } from '../contexts/AuthContext';
import { userAPI } from '../services/api';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const signUp = async (email, password, displayName, userRole = 'adopter', additionalData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Store user data in database
      const userDataToStore = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        userRole,
        ...additionalData
      };

      await userAPI.createOrUpdateUser(userDataToStore);
      
      return userCredential;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Store user data in database
      const userDataToStore = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        userRole: 'adopter'
      };

      await userAPI.createOrUpdateUser(userDataToStore);
      
      // Log user info for debugging
      console.log('Google sign-in user data:', userDataToStore);
      
      return result;
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
      throw error;
    }
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const getUserRole = async (uid) => {
    try {
      if (!uid) return 'adopter';
      
      // Try to get from database first
      const response = await userAPI.getUserByUID(uid);
      if (response.success && response.user) {
        return response.user.userRole || 'adopter';
      }
      
      // Fallback to localStorage if database fails
      return localStorage.getItem(`userRole_${uid}`) || 'adopter';
    } catch (error) {
      console.error('Error getting user role:', error);
      // Fallback to localStorage
      return localStorage.getItem(`userRole_${uid}`) || 'adopter';
    }
  };

  const getUserData = async (uid) => {
    try {
      if (!uid) return null;
      
      // Try to get from database first
      const response = await userAPI.getUserByUID(uid);
      if (response.success && response.user) {
        return response.user;
      }
      
      // Fallback to localStorage if database fails
      const localData = localStorage.getItem(`userData_${uid}`);
      return localData ? JSON.parse(localData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem(`userData_${uid}`);
      return localData ? JSON.parse(localData) : null;
    }
  };

  const updateUserData = async (uid, newData) => {
    try {
      if (!uid) return null;
      
      // Try to update in database first
      const response = await userAPI.updateUser(uid, newData);
      if (response.success) {
        // Update local state
        if (userData && userData.uid === uid) {
          setUserData(prev => ({ ...prev, ...newData }));
        }
        return response;
      }
      
      // Fallback to localStorage if database fails
      const existingData = getUserData(uid) || {};
      const updatedData = { ...existingData, ...newData };
      localStorage.setItem(`userData_${uid}`, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      console.error('Error updating user data:', error);
      // Fallback to localStorage
      const existingData = getUserData(uid) || {};
      const updatedData = { ...existingData, ...newData };
      localStorage.setItem(`userData_${uid}`, JSON.stringify(updatedData));
      return updatedData;
    }
  };

  // Load user data when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Auth state changed - User data:', {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        
        setCurrentUser(user);
        
        // Load user data from database
        try {
          const userDataFromDB = await getUserData(user.uid);
          setUserData(userDataFromDB);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        console.log('Auth state changed - No user');
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    getUserRole,
    getUserData,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};