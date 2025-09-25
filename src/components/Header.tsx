import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/logout-success');
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="bg-black dark:bg-white text-white dark:text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 dark:hover:text-gray-700">
          JobAppTracker
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.username}</span>
              <Link
                to="/home"
                className="hover:text-gray-300 dark:hover:text-gray-700 transition duration-300"
              >
                Home
              </Link>
              <button
                onClick={toggleDarkMode}
                className="bg-gray-700 hover:bg-gray-600 dark:bg-gray-300 dark:hover:bg-gray-400 px-3 py-1 rounded text-white dark:text-black transition duration-300"
              >
                {isDark ? 'Light' : 'Dark'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 px-3 py-1 rounded text-white dark:text-black transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hover:text-gray-300 dark:hover:text-gray-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-300 dark:hover:text-gray-700 transition duration-300"
              >
                Register
              </Link>
              <button
                onClick={toggleDarkMode}
                className="bg-gray-700 hover:bg-gray-600 dark:bg-gray-300 dark:hover:bg-gray-400 px-3 py-1 rounded text-white dark:text-black transition duration-300"
              >
                {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
