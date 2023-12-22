
import "./PopUpTable.css"
import "../PopUpTableB/PopUpTableB.css"

import React, { useState } from "react";

const PopupImage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="text-table-columnA">
                <p className="text-tableA">Visa Bulletin for Table A</p>
                <p className="text-image">click on the image</p>
                </div>
      <img className="tableA" width={220} height={120} src="/images/tableA.png" onClick={openPopup}/>

      {isOpen && (
        <div className="TabA">
          <button className="close-A" onClick={closePopup}>X</button>
          <img className="img-A" src="/images/tableA.png"/>

        </div>

      )}
    </div>
  );
};

export default PopupImage;

