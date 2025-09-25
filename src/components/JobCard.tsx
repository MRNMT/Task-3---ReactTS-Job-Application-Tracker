import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

interface JobCardProps {
  job: Job;
  onDelete: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-status-applied';
      case 'interviewed':
        return 'bg-status-interviewed';
      case 'rejected':
        return 'bg-status-rejected';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(job.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{job.role}</h3>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(job.status)}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{job.details}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>Applied: {new Date(job.dateApplied).toLocaleDateString()}</span>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300 text-center"
        >
          View Details
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDeleting ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Deleting...</span>
            </>
          ) : (
            'Delete'
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
