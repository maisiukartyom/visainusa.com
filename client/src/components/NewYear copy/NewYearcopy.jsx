
import React, { useState, useEffect } from 'react';
import "./NewYearcopy.css";




const NewYearcopy = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            
            <img className='sale-banner' src='images/sale.png'/>
            <button onClick={handleClose} className="popup-close-button">
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewYearcopy;

