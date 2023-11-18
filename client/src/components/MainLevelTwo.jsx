import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {toast} from 'react-toastify'


export const MainLevelTwo = () => {

   const navigate = useNavigate();

   const purchaseLevel = async () => {
      try {
         await axios.post("/payment/verify", 
         {
            level: 2
         },
         {
            withCredentials: true
         })

         navigate("/payment", {state: {levelToPurchase: 2, price: 50}});
      }
      catch(err){
         let errorMessage = "";
         if (!err?.response) {
             errorMessage = 'No Server Response'
         } else if (err.response?.status === 401) {
             errorMessage = 'You already have this level!'
         }
         else if (err.response?.status === 403) {
            errorMessage = 'You are not authorized! Please login or sign up to make purchase!'
         } 

         toast.error(errorMessage, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light"}
         )
      }
   }

    return(
        <div className="levels">
<div className="level-first-block">

<div className="appliName-level">
    <h2 className="level-list">Level 2</h2>
    <h3 className="appliName-names">"Immigration with no mistake"</h3>
    <del className=" price-del-level">$100</del>
            <ins className=" price-level">$49</ins>
               <ul  className="text-discription-level">
                  <li  className="description-level">
                  Personal consultation (60 mins) on English, Spain or Russian languages 
                  </li>
                  <li className="description-level">
                  Deep analysis of your particular <br></br> situation 
                  </li>
                  <li className="description-level">

                  Step-by-step description to obtain <br></br> green card 
                  </li>

                  <li className="description-level">
                  General information about other <br></br> immigration programs in the U.S. 
                  </li>
                  <li className="description-level">
                  24 hours online chat after the consultation 
                  </li>
                  </ul>


               </div>
               <iframe width="550" height="415" src="https://www.youtube.com/embed/2PInBgRNHo4?si=RYBU3j3Bh_VF0Zfv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen className="youtube-level1"></iframe> 

            </div>

                           <div className="button-level2">
                           <div  >
                        <label className="label-level" > Provided information available in  </label>
                        <div className="mt-level">
                            <input className="test"  type="radio" name="question8" id="answerEight" value="yes"/>English
                            <input className="test"  type="radio" name="question8" value="no"/>Russian
                            <input className="test"  type="radio" name="question8" value="no"/>Spanish 
                            <label className="label-level" > languages  </label>
                        </div>
                    </div>
                     <button className="button-level-two" onClick={purchaseLevel}>PAY</button>

                  </div>

</div>

        
    )
}



