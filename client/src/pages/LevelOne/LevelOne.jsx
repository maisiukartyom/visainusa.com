
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { MainLevel } from './MainLevel';
import Footer from '../../components/Footer';
import "./LevelOne.css";
import axios from '../../api/axios';
import { MainLevelPaid } from './MainLevelPaid';
import Contacts from '../../components/Contacts';




const LevelOne = () => {

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
   
       verifyCookie(0)
   }, [])

  return (
      verified &&
      <div >
          <Header />
          {/* {hasLevel? <MainLevelPaid /> : <MainLevel />} */}
          <MainLevelPaid />
          <Contacts/>
          <Footer />
      </div>
  )
}

export default LevelOne