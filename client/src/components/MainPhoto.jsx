import React from "react";
import "../pages/Main/main.css"
import { HeaderForMain } from "./HeaderForMain";
import {Link} from 'react-router-dom';



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

              <div className="buttons">
              <Link to="./abouteb3">
                   <button className="btn-eb3">About EB3</button>
                   </Link>
                 <Link to="./survey" className="btn-level-top">
                  <button className="btn-level-anketa">Determine your eligibility</button>
</Link>
              </div>
          </div>
        </div>
        </div>
        </div>
    )
}