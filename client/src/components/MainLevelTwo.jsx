import React, { useEffect, useState } from "react";
import "../pages/LevelOne/LevelOne.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";


export const MainLevelTwo = () => {

   const navigate = useNavigate();
   const [levelCost, setLevelCost] = useState(0);
   const [canPurchase, setCanPurchase] = useState(false);

   const purchaseLevel = async () => {
      try {
         await axios.post("/payment/verify", 
         {
            level: 2
         },
         {
            withCredentials: true
         })

         navigate("/payment", {state: {levelToPurchase: 2, price: levelCost}});
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

   useEffect(() => {
      async function getLevelCost(){
         try{
             const res = await axios.post("/payment/getLevelCost", {
                 level: 2
             })
             setLevelCost(res.data.cost);
             setCanPurchase(true);
         }
         catch(err){
             toast.error("Error to get level cost!",{
                 position: "top-center",
                 autoClose: 10000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: false,
                 draggable: false,
                 progress: undefined,
                 theme: "light",
                 }
             );
             setCanPurchase(false);
         }
       }

       getLevelCost()
   }, [])

    return(
        <div className="levels">
<div className="level-first-block">

<div className="appliName-level">
    <h2 className="level-list">Level 2</h2>
    <h3 className="appliName-names">"Immigration with no mistake"</h3>
    <div className="price-all">
    <del className=" price-del appliName-levelOne-del">$500</del>
            {canPurchase &&<ins className=" price appliName-levelOne">${levelCost}</ins>}
            </div>
               <ul  className="text-discription-level">
                  <li  className="description-level">
                  Personal consultation (60 mins) on English, Spanish or Russian languages
                  </li>
                  <p className="coming-bonus">
              Our services include:
              </p>
                  <li className="description-level">
                  In-depth insights into the EB3 unskilled program
                  </li>
                  <li className="description-level">

                  Deep analysis of your specific situation
                  </li>

                  <li className="description-level">
                  Step-by-step guidance on obtaining a green card
                  </li>
                  <li className="description-level">
                  General information about other immigration programs in the U.S.
                  </li>
                  <li className="description-level">
                  Enjoy 24/7 online chat support for any additional questions or clarifications after your consultation
                  </li>
                  <Link to='/job'><li className="link-job">
                    Job offering pool            
                  </li></Link>
                  </ul>


               </div>
               <iframe width="550" height="415" src="https://app.heygen.com/share/398cb39f320343f597faf0617e05e22c" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen className="youtube-level1"></iframe> 

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
                     <button className="button-level-two" disabled={!canPurchase} onClick={purchaseLevel}>PAY</button>

                  </div>
                </div>
            )
}



