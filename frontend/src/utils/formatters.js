export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  export const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };
  
  export const statusColors = {
    online: '#4caf50',
    offline: '#f44336',
    maintenance: '#ff9800'
  };
  
  export const severityColors = {
    critical: '#d32f2f',
    medium: '#ff9800',
    low: '#4caf50'
  };