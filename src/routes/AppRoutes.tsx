import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
