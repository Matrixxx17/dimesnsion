import React from 'react';
import { severityColors } from '../utils/formatters';
import './AlertStatus.css';

const AlertStatus = ({ alertCounts }) => {
  const { critical, medium, low, total } = alertCounts;

  return (
    <div className="alert-status-container">
      <h2>Alert Status</h2>
      
      <div className="alert-counters">
        <div className="alert-counter" style={{ borderColor: severityColors.critical }}>
          <h3>Critical</h3>
          <div className="count" style={{ color: severityColors.critical }}>
            {critical}
          </div>
        </div>
        
        <div className="alert-counter" style={{ borderColor: severityColors.medium }}>
          <h3>Medium</h3>
          <div className="count" style={{ color: severityColors.medium }}>
            {medium}
          </div>
        </div>
        
        <div className="alert-counter" style={{ borderColor: severityColors.low }}>
          <h3>Low</h3>
          <div className="count" style={{ color: severityColors.low }}>
            {low}
          </div>
        </div>
        
        <div className="alert-counter total">
          <h3>Total</h3>
          <div className="count">
            {total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertStatus;