import React, { useEffect, useState } from 'react';
import AlertStatus from './AlertStatus';
import UsageCharts from './UsageCharts';
import NetworkTraffic from './NetworkTraffic';
import ServerList from './ServerList';
import { getAlertCounts, getAverageUsage, getNetworkTraffic, getServers, seedData } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [alertCounts, setAlertCounts] = useState({ critical: 0, medium: 0, low: 0, total: 0 });
  const [usageData, setUsageData] = useState({ avg_cpu: 0, avg_ram: 0, avg_disk: 0, avg_app: 0 });
  const [networkData, setNetworkData] = useState([]);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(1); // Default to 1 day

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [alertsRes, usageRes, networkRes, serversRes] = await Promise.all([
        getAlertCounts(),
        getAverageUsage(),
        getNetworkTraffic(timeRange),
        getServers()
      ]);
      
      setAlertCounts(alertsRes.data);
      setUsageData(usageRes.data);
      setNetworkData(networkRes.data);
      setServers(serversRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    try {
      await seedData();
      alert('Mock data seeded successfully!');
      fetchDashboardData();
    } catch (err) {
      console.error('Error seeding data:', err);
      alert('Failed to seed mock data.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const handleTimeRangeChange = (days) => {
    setTimeRange(days);
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Retry</button>
        <button onClick={handleSeedData}>Seed Mock Data</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Server Monitoring Dashboard</h1>
        <div className="time-controls">
          <span>Time Range:</span>
          <button 
            className={timeRange === 1 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(1)}
          >
            1 Day
          </button>
          <button 
            className={timeRange === 7 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(7)}
          >
            7 Days
          </button>
          <button 
            className={timeRange === 30 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(30)}
          >
            30 Days
          </button>
        </div>
        <button className="seed-button" onClick={handleSeedData}>
          Seed Mock Data
        </button>
      </div>
      
      <div className="dashboard-grid">
        <div className="grid-item alert-status">
          <AlertStatus alertCounts={alertCounts} />
        </div>
        
        <div className="grid-item usage-charts">
          <UsageCharts usageData={usageData} />
        </div>
        
        <div className="grid-item network-traffic">
          <NetworkTraffic networkData={networkData} />
        </div>
        
        <div className="grid-item server-list">
          <ServerList servers={servers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;