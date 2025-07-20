import React from 'react';


function ProgressBar({ savedAmount, targetAmount }) {
  const percentage = Math.min((savedAmount / targetAmount) * 100, 100);
  
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="progress-text">{Math.round(percentage)}%</span>
    </div>
  );
}

export default ProgressBar;