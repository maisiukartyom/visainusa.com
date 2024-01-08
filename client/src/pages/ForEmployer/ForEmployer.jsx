import React, {useState} from 'react';
import { Header } from '../../components/Header';
import { MainEmployer } from '../../components/MainEmployer';
import Footer from '../../components/Footer';


import "./ForEmployer.css";
import Contacts from '../../components/Contacts';
import Tophead from '../../components/Top/Top';


const ForEmployer = () => {
  
    return (
        <div >
            <Header />
            <MainEmployer />
            <Contacts/>
            <Footer />
            <Tophead/>
        </div>
    )
  }
  
  export default ForEmployer