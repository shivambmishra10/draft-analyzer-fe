import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/components/Dashboard";
import UploadSection from "@/components/UploadSection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload-policy" element={<ProtectedRoute><UploadSection /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Home />
            </>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
