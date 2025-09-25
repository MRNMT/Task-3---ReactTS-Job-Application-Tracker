import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginSuccess: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-500 dark:bg-green-600 rounded-full p-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-lg">Successfully signed in as <strong>{user?.username}</strong></p>
        </div>

        <div className="text-gray-600 dark:text-gray-400">
          <p className="mb-4">Redirecting you to your dashboard...</p>
          <LoadingSpinner size="lg" color="gray" />
        </div>

        <button
          onClick={() => navigate('/home')}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LoginSuccess;
