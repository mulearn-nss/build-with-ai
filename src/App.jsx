import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import CollectionPage from "./pages/CollectionPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./components/layout/MainLayout";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/collection" replace />} />
          <Route path="/login" element={<AuthPage />} />
          
          <Route 
            element={
              <ProtectedRoute>
                 <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/dashboard/:plantId" element={<DashboardPage />} />
            <Route path="/settings" element={<div className="p-10 font-extrabold text-3xl">Settings (Demo)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
