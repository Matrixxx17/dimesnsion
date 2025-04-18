import axios from 'axios';



const API = process.env.REACT_PUBLIC_API_URL;

export async function fetchServers() {
  const res = await fetch(`${API}/servers`);
  if (!res.ok) throw new Error("Failed to load servers");
  return res.json();
}


const api = axios.create({
  baseURL: API,
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
