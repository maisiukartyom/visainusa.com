import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../pages/Jobs/Jobs.css"

const Slider = ({images}) => {

  return (

    <Carousel className='carousel '>
      {images.map((image, index) => (
        <div className='img-slider' key={index}>
          <img className='slider' src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>

  );
};

export default Slider
