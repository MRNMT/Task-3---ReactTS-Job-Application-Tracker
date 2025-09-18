import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export interface Job {
  id: number;
  userId: number;
  company: string;
  role: string;
  status: 'applied' | 'interviewed' | 'rejected';
  dateApplied: string;
  details: string;
}

export const api = {
  // Jobs
  getJobs: (userId: number) => axios.get<Job[]>(`${API_BASE_URL}/jobs?userId=${userId}`),
  getJob: (id: number) => axios.get<Job>(`${API_BASE_URL}/jobs/${id}`),
  createJob: (job: Omit<Job, 'id'>) => axios.post<Job>(`${API_BASE_URL}/jobs`, job),
  updateJob: (id: number, job: Partial<Job>) => axios.patch<Job>(`${API_BASE_URL}/jobs/${id}`, job),
  deleteJob: (id: number) => axios.delete(`${API_BASE_URL}/jobs/${id}`),

  // Users
  getUsers: () => axios.get(`${API_BASE_URL}/users`),
  createUser: (user: { username: string; password: string }) => axios.post(`${API_BASE_URL}/users`, user),
};
