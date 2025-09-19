import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Job, api } from '../utils/api';
import JobForm from '../components/JobForm';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob(parseInt(id));
    }
  }, [id]);

  const fetchJob = async (jobId: number) => {
    try {
      const response = await api.getJob(jobId);
      setJob(response.data);
    } catch (err) {
      setError('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJob = async (jobData: Omit<Job, 'id' | 'userId'>) => {
    if (!job) return;
    try {
      await api.updateJob(job.id, jobData);
      setEditing(false);
      fetchJob(job.id);
    } catch (err) {
      setError('Failed to update job');
    }
  };

  const handleDeleteJob = async () => {
    if (!job) return;
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.deleteJob(job.id);
        navigate('/home');
      } catch (err) {
        setError('Failed to delete job');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Job not found'}
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-black">
      {editing ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <JobForm
            job={job}
            onSubmit={handleUpdateJob}
            onCancel={() => setEditing(false)}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.role}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{job.company}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-white text-lg font-medium ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Application Details</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {job.status.charAt(0).toUpperCase() + job.status.slice(1)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Job Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Role:</strong> {job.role}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Job Details</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{job.details || 'No additional details provided.'}</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
            >
              Edit Job
            </button>
            <button
              onClick={handleDeleteJob}
              className="bg-red-500 dark:bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-800 transition duration-300"
            >
              Delete Job
            </button>
            <button
              onClick={() => navigate('/home')}
              className="bg-gray-500 dark:bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-800 transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
