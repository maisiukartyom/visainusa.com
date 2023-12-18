
import React, { useState, useEffect } from 'react';
import "./NewYearcopy.css";
import TimerSecond from '../TimerSecond/TimerSecond';




const NewYearcopySecond = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="popup-new-t">
          <div className="popup-content-new-t">
            
            <img className='sale-bannerr' src='images/sale-second.png'/>
            <button onClick={handleClose} className="popup-close-buttonn">
              X
            </button>
            <TimerSecond/>
          </div>
        </div>
      )}
    </>
  );
};

export default NewYearcopySecond;

