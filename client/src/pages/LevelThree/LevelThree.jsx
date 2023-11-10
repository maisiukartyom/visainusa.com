import React, {useState, useEffect} from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import {Link} from 'react-router-dom';
import { MainLevelThree } from '../../components/MainLevelThree';
import axios from '../../api/axios';


const LevelThree = () => {
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
     
         verifyCookie(3)
     })

    return (
        verified &&
        <div >
            <Header />
            {hasLevel? <div>Level 3 is purchased!</div> : <MainLevelThree />}
            <Footer />
        </div>
    )
  }
  
  export default LevelThree