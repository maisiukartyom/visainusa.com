import React, { useEffect } from "react";
import "../pages/Main/main.css"
import { HeaderForMain } from "./HeaderForMain";
import {Link} from 'react-router-dom';
import { gsap } from "gsap";


export const MainPhoto = ({isUser, logout}) => {

  const fly = () => {
    if (window.innerWidth >= 1370) {
      gsap.from("#first-text", { x: 1500, duration: 0.8, ease: "power1.out" });
      gsap.from("#second-text", {
        x: 1500,
        duration: 0.8,
        ease: "power1.out",
        delay: 0.5,
      });
      gsap.from("#third-text", {
        x: 1500,
        duration: 0.8,
        ease: "power1.out",
        delay: 0.9,
      });
    } 
    };

    useEffect(() => {
      fly();
    }, [isUser])

    return(
      <>
      {isUser && <HeaderForMain isUser={isUser} logout = {logout}/>}      
      {   !isUser && <div className="photoMain">
        <HeaderForMain isUser={isUser} logout = {logout}/>
     <div>
        <div className="center-text">
        <div className="first-text">
      <p id="first-text" >EB3 unskilled program</p>
      </div>
      <div className="second-text">
       <p id="second-text" >All our team got green cards through it </p>
       </div>
       <div className="third-text">
        <p id="third-text">We do know how to assist your case</p>
      </div>
              <div className="buttons-main">
              <Link to="./abouteb3">
                   <button className="btn-abouteb3">About EB3</button>
                   </Link>
                 <Link to="/survey" className="btn-level-top">
                 <button className="btn-level-anketa-l">Determine your eligibility</button></Link>
              </div>
        </div>
        </div>
        </div>}
      </>
    )
}