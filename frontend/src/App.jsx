import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import FamilyBonusDashboard from "./pages/FamilyBonusDashboard";
import SignUpLogin from "./pages/SignUpLogin";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/* Routes for pages */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/family"
          element={
            <PrivateRoute>
              <FamilyBonusDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
