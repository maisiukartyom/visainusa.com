import React, { useState } from 'react';
import "../../src/pages/AboutUs/AboutUs.css"



const TextBlocktwo = ({ title, description }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-levelTwo">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-levelTwo">{description}  </p>)}
    </div>
  );
};

export default TextBlocktwo;

