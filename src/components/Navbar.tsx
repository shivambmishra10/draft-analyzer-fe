import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Policy Analyzer</Link>
      <div className="space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
