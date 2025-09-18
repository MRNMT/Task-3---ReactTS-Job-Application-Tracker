import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../utils/api';

interface JobCardProps {
  job: Job;
  onDelete: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(job.status)}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{job.details}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Applied: {new Date(job.dateApplied).toLocaleDateString()}</span>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
