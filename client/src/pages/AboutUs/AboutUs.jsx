import React, {useState} from 'react';
import { Header } from '../../components/Header';

import Footer from '../../components/Footer';


import "../AboutUs/AboutUs.css";
import AboutUsMain from '../../components/AboutUsMain';
import Contacts from '../../components/Contacts';


const AbotUs = () => {
  
    return (
        <div >
            <Header />
<AboutUsMain />
<Contacts/>
  <Footer />
        </div>
    )
  }
  
  export default AbotUs