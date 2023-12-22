
import "./PopUpTableB.css"
import React, { useState, useEffect } from 'react';

const PopupImageB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
            <div className="text-table-columnB">
                <p className="text-tableA">Visa Bulletin for Table B</p>
                <p className="text-image">click on the image</p>
                </div>
      <img className="tableB" width={220} height={120} src="/images/tableB.png" onClick={openPopup}/>

      {isOpen && (
        <div className="TabA">
          <div className="closeA"><button className="close-A" onClick={closePopup}>X</button></div>
          <img className="img-A" src="/images/tableB.png"/>
        </div>
      )}
    </div>
  );
};

export default PopupImageB;

