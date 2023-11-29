import React, { useState } from 'react';
import "../../src/pages/AboutEB3/AboutEB3.css"



const TextBlockEB3 = ({ title, description }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-AboutEB3">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-AboutEB3-more">{description}  </p>)}
    </div>
  );
};

export default TextBlockEB3;

