import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const LogoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300 px-6 py-4 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-500 dark:bg-blue-600 rounded-full p-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Signed out successfully!</h2>
          <p className="text-lg">Thank you for using JobAppTracker</p>
        </div>

        <div className="text-gray-600 dark:text-gray-400">
          <p className="mb-4">Redirecting you to the home page...</p>
          <LoadingSpinner size="lg" color="gray" />
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default LogoutSuccess;
