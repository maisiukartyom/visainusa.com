import React from "react";
import "../pages/Main/main.css"
import { HeaderForMain } from "./HeaderForMain";
import { Link } from "react-router-dom";


export const MainPhoto = () => {
    return(
        <div className="photoMain">
            <HeaderForMain />
        <div>
       <div className="center">
      <div className="fly">
      <p id="first">EB3 unskilled program</p>
       <p id="second">We got green cards through it </p>
       <p id="third">We do know how to assist your case</p>

       {/* <p id="first">We will help you</p>
       <p id="second">make your dream</p>
            <p id="third">come true</p> */}
              <div className="buttons">
                <a href="#">
                   <button className="btn-eb3">About EB3</button>
                 </a>
                 <Link to="/survey"><button className="btn-level">Check your eligibility</button></Link>
               </div>
          </div>
        </div>
        </div>
        </div>
    )
}