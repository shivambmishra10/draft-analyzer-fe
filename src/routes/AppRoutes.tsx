import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/components/Dashboard";
import UploadPolicy from "@/pages/UploadPolicy";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload-policy" element={<ProtectedRoute><UploadPolicy /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <HomePage />
            </>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
