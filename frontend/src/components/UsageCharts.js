import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '../utils/formatters';
import './UsageCharts.css';

const UsageCharts = ({ usageData }) => {
  const { avg_cpu, avg_ram, avg_disk, avg_app } = usageData;
  
  // Create data array for each chart
  const createChartData = (usedValue) => [
    { name: 'Used', value: usedValue },
    { name: 'Free', value: 100 - usedValue }
  ];

  const cpuData = createChartData(avg_cpu);
  const ramData = createChartData(avg_ram);
  const diskData = createChartData(avg_disk);
  const appData = createChartData(avg_app);
  
  const COLORS = ['#0088FE', '#ECEFF1'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    ) : null;
  };

  const ChartWithLabel = ({ title, data, value }) => (
    <div className="chart-container">
      <h3>{title}: {formatPercentage(value)}</h3>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="usage-charts-container">
      <h2>Server Resource Usage</h2>
      <div className="charts-grid">
        <ChartWithLabel title="CPU Usage" data={cpuData} value={avg_cpu} />
        <ChartWithLabel title="RAM Usage" data={ramData} value={avg_ram} />
        <ChartWithLabel title="Disk Usage" data={diskData} value={avg_disk} />
        <ChartWithLabel title="App Usage" data={appData} value={avg_app} />
      </div>
    </div>
  );
};

export default UsageCharts;