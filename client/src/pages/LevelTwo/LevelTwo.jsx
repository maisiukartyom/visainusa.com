import React, {useState} from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import { MainLevelTwo } from './MainLevelTwo';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../../api/axios';
import Calendly from '../../components/Calendly/Calendly';
import {toast} from 'react-toastify';
import { MainLevelTwoPaid } from './MainLevelTwoPaid';
import Contacts from '../../components/Contacts';


const LevelTwo = () => {
    const [hasLevel, setHasLevel] = useState(false);
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});


    useEffect(() => {
        const verifyCookie = async (level) => {
           try{
             const user = await axios.post("auth/verify",
                 {
                     requiredLevel: level
                 },
                 {
                     withCredentials: true
                 })
             if (user.data.isAdmin){
               setHasLevel(true)
             }
             else if (user.data.level >= level){
               setHasLevel(true)
             }
             else if (user.data.level < level){
              setHasLevel(false)
             }
             setUser({email: user.data.email, isAdmin: user.data.isAdmin, name: user.data.name})
             setVerified(true)
           }
           catch (err){
            setHasLevel(false)
            setVerified(true)
           }
         }
     
         verifyCookie(2)
     }, [])
  
    return (
        verified &&
        <div >
            <Header />
            {
                hasLevel? <MainLevelTwoPaid /> : <MainLevelTwo/>
            }
            <Contacts/>
            <Footer />
            {hasLevel && <Calendly userEmail={user.email} userName={user.name} />}
        </div>
    )
  }
  
  export default LevelTwo