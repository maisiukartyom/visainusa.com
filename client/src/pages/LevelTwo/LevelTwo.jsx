import React, {useState} from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import { MainLevelTwo } from '../../components/MainLevelTwo';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../../api/axios';


const LevelTwo = () => {
    const [hasLevel, setHasLevel] = useState(false);
    const [verified, setVerified] = useState(false)

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
             setVerified(true)
           }
           catch (err){
            setHasLevel(false)
            setVerified(true)
           }
         }
     
         verifyCookie(2)
     })
  
    return (
        verified &&
        <div >
            <Header />
            {
                hasLevel? <div>Level 2 is purchased!</div> : <MainLevelTwo />
            }
            <Footer />
        </div>
    )
  }
  
  export default LevelTwo