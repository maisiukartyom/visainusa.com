
import React, { useState, useEffect } from 'react';
import "./NewYearcopy.css";
import Timer from '../Timer/Timer';




const NewYearcopy = ({showSale}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    showSale(false);
    sessionStorage.setItem("saleShown", "true");
  };

  return (
    <>
      {isOpen && (
        <div className="popup-new-t">
          <div className="popup-content-new-t">
            
            <img className='sale-bannerr' src='images/sale.png'/>
            <button onClick={handleClose} className="popup-close-buttonn">
              X
            </button>
            <Timer/>

          </div>
        </div>
      )}
    </>
  );
};

export default NewYearcopy;

