import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text }) => {
  return (
    <div className="loading-spinner-container">
      <FaSpinner className="loading-spinner" />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
