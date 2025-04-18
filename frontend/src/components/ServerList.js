import React, { useState } from 'react';
import { formatDate, statusColors } from '../utils/formatters';
import './ServerList.css';

const ServerList = ({ servers }) => {
  const [selectedServerId, setSelectedServerId] = useState(null);

  const handleServerClick = (serverId) => {
    setSelectedServerId(serverId === selectedServerId ? null : serverId);
  };

  return (
    <div className="server-list-container">
      <h2>Server List</h2>
      <div className="server-table-container">
        <table className="server-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr 
                key={server.id} 
                onClick={() => handleServerClick(server.id)}
                className={selectedServerId === server.id ? 'selected' : ''}
              >
                <td>{server.name}</td>
                <td>{server.ip_address}</td>
                <td>{server.location}</td>
                <td>
                  <span 
                    className="status-indicator" 
                    style={{ backgroundColor: statusColors[server.status] }}
                  ></span>
                  {server.status}
                </td>
                <td>{formatDate(server.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServerList;