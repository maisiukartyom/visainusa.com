
import React, {useState} from 'react';
import { Header } from '../../components/Header';
import { MainLevel } from '../../components/MainLevel';
import Footer from '../../components/Footer';
import "./LevelOne.css";




const LevelOne = () => {
  
  return (
      <div >
          <Header />
          <MainLevel />
          <Footer />
      </div>
  )
}

export default LevelOne