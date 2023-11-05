import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../../components/Header';
import { MainEmployer } from '../../components/MainEmployer';
import Footer from '../../components/Footer';


import "./ForEmployer.css";


const ForEmployer = () => {
  
    return (
        <div >
            <Header />
            <MainEmployer />
  <Footer />
        </div>
    )
  }
  
  export default ForEmployer