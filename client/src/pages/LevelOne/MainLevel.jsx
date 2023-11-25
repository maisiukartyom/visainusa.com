import React from "react";

import "../LevelOne/LevelOne.css";
import axios from "../../api/axios";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";


export const MainLevel = () => {
   const navigate = useNavigate();
   const purchaseLevel = async () => {
      try {
         await axios.post("/payment/verify", 
         {
            level: 1
         },
         {
            withCredentials: true
         })

         navigate("/payment", {state: {levelToPurchase: 1, price: 25}});
      }
      catch(err){
         let errorMessage = "";
         if (!err?.response) {
             errorMessage = 'No Server Response'
         } else if (err.response?.status === 401) {
             errorMessage = 'You already have this level!'
         }
         else if (err.response?.status === 403) {
            errorMessage = 'You are not authorized! Please login or sign up to make purchase!';
            navigate("/login");
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
    <h2 className="level-list">Level 1</h2>
    <p className=" appliName-levelOne">FREE</p>
               <ul  className="text-discription-level">
                  <li  className="description-level">
                  What is EB3 unskilled visa category?
                  </li>
                  <li className="description-level">
                  How does EB3 unskilled visa work?
                  </li>
                  <li className="description-level">

                  How long does it take to get the U.S.  permanent resident card? 
                  </li>

                  <li className="description-level">
                  Am I eligible for EB3 unskilled visa?
                  </li>
                  <li className="description-level">
                  How much does EB3 unskilled cost?
                  </li>
                  <li className="description-level">
                  What should I do in case of refusal?
                  </li>
                  <li className="description-level">
                  How do I start my EB3 journey?
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



