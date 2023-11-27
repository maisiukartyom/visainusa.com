import React, { useState } from 'react';
import "../../src/pages/LevelOne/LevelOne.css"



const TextBlockone = ({ title, description, description1, description2, description3, description4  }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-levelOne">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-levelOneRead">{description}  </p>)}
      {showMore && ( <p className="text-levelOneRead">{description1}  </p>)}
      {showMore && ( <p className="text-levelOneRead">{description2}  </p>)}
      {showMore && ( <p className="text-levelOneRead">{description3}  </p>)}
      {showMore && ( <p className="text-levelOneRead">{description4}  </p>)}

    </div>
  );
};

export default TextBlockone;

