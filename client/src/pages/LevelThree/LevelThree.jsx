import React, {useState, useEffect} from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import "../LevelOne/LevelOne.css";
import { MainLevelThree } from '../../components/MainLevelThree';
import axios from '../../api/axios';
import Calendly from '../../components/Calendly/Calendly';
import Contacts from '../../components/Contacts';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


const LevelThree = () => {
    const [hasLevel, setHasLevel] = useState(false);
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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

             // DELETE LATER
             if (!user.data.isAdmin){
              toast.error("Level is still in development!", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
                navigate("/")
             }
             setVerified(true);
             setUser({email: user.data.email, isAdmin: user.data.isAdmin, name: user.data.name})
           }
           catch (err){
            setHasLevel(false)
            setVerified(true)
           }
         }
     
         verifyCookie(3)
     }, [])

    return (
        verified &&
        <div >
            <Header />
            {hasLevel? <div>Level 3 is purchased!</div> : <MainLevelThree />}
            <Contacts/>
            <Footer />
            {hasLevel && <Calendly userEmail={user.email} userName={user.name} />}
        </div>
    )
  }
  
  export default LevelThree