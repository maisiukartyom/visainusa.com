import React, { useState } from 'react';
import './Top.css';
import {Link} from 'react-router-dom';


const Tophead = () => {


  return (
      <div onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })}>
        <div className='top-form-container'>
          <img src='/images/top.png' alt='icon' width={50} height={47} className="top-toggle"  />
        </div>
      </div>
  );
};

export default Tophead;
