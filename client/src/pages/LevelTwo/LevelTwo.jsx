import React from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import { MainLevelTwo } from '../../components/MainLevelTwo';
import {Link} from 'react-router-dom';


const LevelTwo = () => {
  
    return (
        <div >
            <Header />
<MainLevelTwo />
            <Footer />
        </div>
    )
  }
  
  export default LevelTwo