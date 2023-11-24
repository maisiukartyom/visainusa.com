import React, { useEffect, useState } from "react";
import "../pages/LevelOne/LevelOne.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import TextBlocktwo from "./TextBlocktwo";



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
      <div>
      <div className="text-leveltwo">
      <h2 className="h2-level">Level 2</h2>
      <TextBlocktwo className="text-levelTwo" title="Welcome to Level 2 - immigration with no mistakes. Having the call with one of our experienced experts, who possess
             first-hand knowledge gained from personally going through the EB3 unskilled program, is crucial for navigating the
              complexities of your immigration process. This personalized consultation is an invaluable opportunity to discuss your
               unique situation, receive tailored advice, and ensure that your journey is as smooth and successful as possible. 
               During your scheduled call with our expert, you can expect a comprehensive discussion tailored to your specific immigration
                needs. ..." description="Our experienced professionals will assess your situation, address any concerns you may have, and provide 
                personalized guidance. Be prepared to discuss your goals and challenges, and let our expert guide you through the 
                next steps of your immigration journey. Your peace of mind begins with this conversation. Our team is dedicated to 
                guiding you through every step of the immigration process. Let's embark on your journey to the U.S. together. 
                Don't miss the opportunity to gain valuable insights, ask questions, and set yourself on the right path. 
                Please note that no statements made during the upcoming consultation constitute legal advice or establish 
                an attorney-client relationship. Visa in USA  Limited Liability Company is not a law firm and cannot provide legal advice. 
                To schedule a call with one of our experts, please click on the 'Pay' button below. You'll be directed to the payment page to complete your transaction.
             After payment, you'll be granted access to our calendar for booking the call. Thank you!
        " />
      
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
                    <li className="description-level">
                    Job offering pool            
                    </li>
                  </ul>


                </div>

<div className="video-level">
<iframe    src="https://www.youtube.com/embed/HHjjHUIbpH0?si=h-tmIHklDpwDPQV5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
 clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen className="youtube-leveltwo"></iframe> 
                </div> 
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
</div>
</div>
        
    )
}



