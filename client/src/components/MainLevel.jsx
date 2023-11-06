import React from "react";

import "../pages/LevelOne/LevelOne.css";



export const MainLevel = () => {
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
               <iframe width="550" height="415" src="https://www.youtube.com/embed/2PInBgRNHo4?si=RYBU3j3Bh_VF0Zfv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen className="youtube-level1"></iframe> 
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



