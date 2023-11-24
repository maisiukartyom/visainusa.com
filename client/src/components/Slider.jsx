import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../pages/Job/Job.css"

const Slider = () => {
  const images = [
    { src: 'images/ny2.jpg' },
    { src: 'images/ny4.jpg' },
    { src: 'images/ny3.jpg' }
  ];

  return (

    <Carousel className='carousel '>
      {images.map((image, index) => (
        <div className='img-slider' key={index}>
          <img className='slider' src={image.src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>

  );
};

export default Slider
