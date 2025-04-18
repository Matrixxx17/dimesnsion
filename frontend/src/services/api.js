import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server endpoints
export const getServers = () => api.get('/servers');
export const getServer = (id) => api.get(`/servers/${id}`);

// Metrics endpoints
export const getServerMetrics = (serverId, days = 1) => 
  api.get(`/metrics/${serverId}?days=${days}`);
export const getAverageUsage = () => api.get('/metrics/usage/average');
export const getNetworkTraffic = (days = 1) => 
  api.get(`/metrics/network/traffic?days=${days}`);

// Alert endpoints
export const getAlerts = (params = {}) => api.get('/alerts', { params });
export const getAlertCounts = () => api.get('/alerts/count');
export const resolveAlert = (alertId) => api.post(`/alerts/${alertId}/resolve`);

// Data seeding
export const seedData = () => api.post('/seed-data');

export default api;
