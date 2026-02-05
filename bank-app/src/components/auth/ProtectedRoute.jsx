import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const isAuthenticated = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Optional: Redirect to unauthorized page or home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
