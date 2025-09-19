import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
          Job Application Tracker
        </h1>
        <p className="text-xl text-black dark:text-white mb-8">
          Keep track of your job applications, monitor their status, and stay organized in your job search journey.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-black dark:border-white text-black dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300"
          >
            Login
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-black dark:text-white">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Track Applications</h3>
            <p>Keep a record of all your job applications in one place.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Monitor Status</h3>
            <p>Update and track the status of each application easily.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Stay Organized</h3>
            <p>Search, filter, and sort your applications for better insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
