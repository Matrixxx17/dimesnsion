import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatBytes } from '../utils/formatters';
import './NetworkTraffic.css';

const NetworkTraffic = ({ networkData }) => {
  // Process the data to group by timestamp
  const processedData = networkData.reduce((acc, curr) => {
    const timestamp = new Date(curr.timestamp).toLocaleString();
    const existingEntry = acc.find(item => item.timestamp === timestamp);
    
    if (existingEntry) {
      existingEntry[curr.server_name] = curr.network_traffic;
    } else {
      const newEntry = { timestamp };
      newEntry[curr.server_name] = curr.network_traffic;
      acc.push(newEntry);
    }
    
    return acc;
  }, []);
  
  // Get unique server names for creating lines
  const serverNames = [...new Set(networkData.map(item => item.server_name))];
  
  // Create a color array for the lines
  const COLORS = ['#FF0000', '#FF4500', '#FF6347'];

  return (
    <div className="network-traffic-container">
      <h2>Network Traffic</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={processedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            tickFormatter={formatBytes}
          />
          <Tooltip 
            formatter={(value) => formatBytes(value)}
          />
          <Legend />
          {serverNames.map((server, index) => (
            <Line
              key={server}
              type="monotone"
              dataKey={server}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
              name={server}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkTraffic;