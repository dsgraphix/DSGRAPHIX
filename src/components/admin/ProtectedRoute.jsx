import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2A2A29] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#FF6636] border-t-transparent animate-spin mb-4" />
        <p className="font-display font-bold uppercase tracking-wider text-sm">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
