import React, { useState } from 'react';
import "../../src/pages/AboutUs/AboutUs.css"



const TextBlock = ({ title, description }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-Alexey">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-Alexey-more">{description}  </p>)}
    </div>
  );
};

export default TextBlock;

