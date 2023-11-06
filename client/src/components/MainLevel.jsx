import React from "react";

import "../pages/LevelOne/LevelOne.css";
import axios from "../api/axios";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";


export const MainLevel = () => {
   const navigate = useNavigate();
   const payForLevel = async () => {
      try{
         await axios.get("/checkout/level1", {
            withCredentials: true
         })

         toast.success("Succesfully purchased level 1!", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light"}
         )

         navigate("/profile")
      }
      catch(err){
         let errorMessage = "";
         if (!err?.response) {
             errorMessage = 'No Server Response'
         } else if (err.response?.status === 401) {
             errorMessage = 'You already have this level!'
         }
         else if (err.response?.status === 403) {
            errorMessage = 'You are not authorized! Please sign up to make purchase!'
         } 
         else {
             errorMessage = 'Payment failed!'
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
               <del className=" price-del-level">$50</del>
               <ins className=" price-level" >$25</ins>
               <ul  className="text-discription-level">
                  <li  className="description-level">
                      - What is eb3 unskilled visa category?
                  </li>
                  <li className="description-level">
                      - How does eb3 unskilled visa work?
                  </li>
                  <li className="description-level">

                    - How long does it take to get the U.S. permanent resident card? 
                  </li>

                  <li className="description-level">
                     - Am i eligible for eb3 unskilled visa?
                  </li>
                  <li className="description-level">
                     - How much does eb3 unskilled cost?
                  </li>
                  <li className="description-level">
                     - What should i do in case of refusal?
                  </li>
                  <li className="description-level">
                     - How do i start my eb3 journey?
                  </li>
                     <li className="description-level">
                        - Online chat 24 hours 
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
             <a href="#"  target="_blank">
                  <button className="button-level-two">CHOOSE</button>
                  </a> 
                  </div>
            

</div>

        
    )
}



