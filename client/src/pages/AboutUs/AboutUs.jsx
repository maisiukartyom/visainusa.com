import React, {useState} from 'react';
import { Header } from '../../components/Header';

import Footer from '../../components/Footer';


import "../AboutUs/AboutUs.css";
import AboutUsMain from '../../components/AboutUsMain';
import Contacts from '../../components/Contacts';
import Tophead from '../../components/Top/Top';
import NewYearcopySecond from '../../components/NewYearSecond/NewYearcopy';


const AbotUs = () => {
  
    return (
        <div >
          {/* <NewYearcopySecond/> */}
            <Header />
<AboutUsMain />
<Contacts/>
  <Footer />
  <Tophead/>
        </div>
    )
  }
  
  export default AbotUs