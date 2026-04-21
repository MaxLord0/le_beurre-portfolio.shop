import React from 'react';
import './Marquee.css';

const Marquee = ({ text }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {/* Repeat 4 times for infinite loop */}
        <div className="marquee-content">
          <span>{text}</span>
        </div>
        <div className="marquee-content">
          <span>{text}</span>
        </div>
        <div className="marquee-content">
          <span>{text}</span>
        </div>
        <div className="marquee-content">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
