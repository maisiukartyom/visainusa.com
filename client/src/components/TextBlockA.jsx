import React, { useState } from 'react';
import "../components/ApplyNow/ApplyNow.css";
import { Link } from "react-router-dom";



const TextBlockA = ({ title, description, description1, description2,  description3,  description4,  description5,  description6,  description7,  description8,  description9 }) => {
  const [showMore, setShowMore, isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setShowMore(!showMore);   }

  return (
    <div>
      <p className="text-levelApply">{title}  <button  className='button-read'onClick={handleClick}>  
          {showMore ? 'Close' : 'Read more'}</button></p>
      
      {showMore && ( <p className="text-levelApply">{description}  </p>)}
      {showMore && ( <p className="text-levelApply">{description1 } </p>)}
      {showMore && ( <p className="text-levelA">{description2}  </p>)}
      {showMore && ( <p className="text-levelA">{description3}  </p>)}
      {showMore && ( <p className="text-levelA">{description4}  </p>)}
      {showMore && ( <p className="text-levelA">{description5}  </p>)}
      {showMore && ( <p className="text-levelA">{description6}  </p>)}
      {showMore && ( <p className="text-levelA">{description7}  </p>)}
      {showMore && ( <p className="text-levelApply">{description8}  </p>)}
      {showMore && ( <p className="text-levelApply">{description9}  </p>)}
    </div>
  );
};

export default TextBlockA;

