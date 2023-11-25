import React, { useState } from 'react';
import "../../src/pages/LevelOne/LevelOne.css"



const TextBlockone = ({ title, description }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-levelOne">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-levelOneRead">{description}  </p>)}
    </div>
  );
};

export default TextBlockone;

