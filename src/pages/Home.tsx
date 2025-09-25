import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Job, api } from '../utils/api';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [addingJob, setAddingJob] = useState(false);

  // URL params
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || 'all';
  const sort = searchParams.get('sort') || 'date-desc';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterAndSortJobs();
  }, [jobs, search, filter, sort]);

  const fetchJobs = async () => {
    if (!user) return;
    try {
      const response = await api.getJobs(user.id);
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortJobs = () => {
    let filtered = jobs;

    // Search
    if (search) {
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
    if (filter !== 'all') {
      filtered = filtered.filter(job => job.status === filter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sort === 'date-desc') {
        return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
      } else if (sort === 'date-asc') {
        return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
      } else if (sort === 'company') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });

    setFilteredJobs(filtered);
  };

  const handleAddJob = async (jobData: Omit<Job, 'id' | 'userId'>) => {
    if (!user) return;
    setAddingJob(true);
    try {
      await api.createJob({ ...jobData, userId: user.id });
      setShowForm(false);
      setSuccess('Job added successfully!');
      setError('');
      fetchJobs();
    } catch (err) {
      setError('Failed to add job');
      setSuccess('');
    } finally {
      setAddingJob(false);
    }
  };

  const handleUpdateJob = async (jobData: Omit<Job, 'id' | 'userId'>) => {
    if (!editingJob) return;
    try {
      await api.updateJob(editingJob.id, jobData);
      setEditingJob(undefined);
      setSuccess('Job updated successfully!');
      setError('');
      fetchJobs();
    } catch (err) {
      setError('Failed to update job');
      setSuccess('');
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.deleteJob(id);
        setSuccess('Job deleted successfully!');
        setError('');
        fetchJobs();
      } catch (err) {
        setError('Failed to delete job');
        setSuccess('');
      }
    }
  };

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">My Job Applications</h1>
        <button
          onClick={() => setShowForm(true)}
          disabled={addingJob}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {addingJob ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Adding...</span>
            </>
          ) : (
            'Add New Job'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-black dark:text-white mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => updateSearchParams('search', e.target.value)}
              placeholder="Search by company or role"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-black dark:text-white mb-1">
              Filter by Status
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => updateSearchParams('filter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interviewed">Interviewed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-black dark:text-white mb-1">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => updateSearchParams('sort', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="date-desc">Date Applied (Newest)</option>
              <option value="date-asc">Date Applied (Oldest)</option>
              <option value="company">Company Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Form Modal */}
      {(showForm || editingJob) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <JobForm
              job={editingJob}
              onSubmit={editingJob ? handleUpdateJob : handleAddJob}
              onCancel={() => {
                setShowForm(false);
                setEditingJob(undefined);
              }}
            />
          </div>
        </div>
      )}

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No jobs found. Add your first job application!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
