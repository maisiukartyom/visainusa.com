import React from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import {Link} from 'react-router-dom';
import { MainLevelThree } from '../../components/MainLevelThree';


const LevelThree = () => {
  
    return (
        <div >
            <Header />
            <MainLevelThree />
            <Footer />
        </div>
    )
  }
  
  export default LevelThree