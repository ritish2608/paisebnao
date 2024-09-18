import React from 'react';
import { Navigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PublicRoute = ({ children, restricted = false }) => {
  const isAuthenticated = !!AsyncStorage.getItem('access_token'); 
  return isAuthenticated && restricted ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
