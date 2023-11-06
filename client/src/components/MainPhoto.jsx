import React from "react";
import "../pages/Main/main.css"
import { HeaderForMain } from "./HeaderForMain";



export const MainPhoto = () => {
    return(
        <div className="photoMain">
            <HeaderForMain />
<div>
       <div className="center">
      <div className="fly">
      <p id="first">EB3 unskilled program</p>
       <p id="second">We got green cards thru it </p>
       <p id="third">We do know how assist your case</p>

       {/* <p id="first">We will help you</p>
       <p id="second">make your dream</p>
            <p id="third">come true</p> */}
              <div className="buttons">
                <a href="#">
                   <button className="btn-eb3">About EB3</button>
                 </a>
                  <button className="btn-level">Check your eligibility</button>

               </div>
          </div>
        </div>
        </div>
        </div>
    )
}