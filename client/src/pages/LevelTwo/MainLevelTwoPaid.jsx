import React from "react";
import {Link} from 'react-router-dom';
import "../LevelOne/LevelOne.css";
import TextBlocktwo from "../../components/TextBlocktwo";
import Tophead from "../../components/Top/Top";
import Calendly from "../../components/Calendly/Calendly";



export const MainLevelTwoPaid = () => {

    return(
      <div>

      <div className="text-leveltwo">
      <h2 className="h2-level">Level 2</h2>
      <TextBlocktwo className="text-levelTwo" title="Thank you for choosing Level 2! To schedule a call with one of our experts, it's as easy as clicking on the 'Schedule the Call' button below on this page. Choose a time slot that suits you,
       answer a few questions, and list any concerns you'd like to discuss during the call.  ..." description="his helps us tailor the conversation to your specific needs and ensures that you get the most out of your consultation. We're here to assist you on your immigration journey. If you encounter any issues with scheduling,
        feel free to chat with us or give us a call. We're here to help! 
        " />
      
        <div className="levels">
<div className="level-first-block">

<div className="appliName-level">
    <h2 className="level-list">Level 2</h2>
    <h3 className="appliName-names">"Immigration with no mistake"</h3>
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
                  <li className="description-level ">
              List of EB3 unskilled agencies 
              </li>
                  <li className="description-level">
                  Enjoy 24/7 online chat support for any additional questions or clarifications after your consultation
                  </li>


                  </ul>

                  <div className="button-pool">
                  <a  href="https://docs.google.com/spreadsheets/d/10dTZRQGvCD2soSDIop9TB-p7od37ZJXDcmaC4ZNs-og/edit?usp=sharing" target="blank"><button className="btn-pool">List of EB3 agencies</button></a>
                  <Link to='/jobs'><button className="btn-pool">
                  Job offering pool            
                  </button></Link>
                  </div>
                  <Calendly/>
                </div>

<div className="video-level">
<iframe    src="https://www.youtube.com/embed/bVOkKrVkw6U?si=5aG1vaghX5D2O2qQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
 clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen className="youtube-leveltwo"></iframe> 
                </div> 
            </div>

                           

</div>
</div>
<Tophead/>
</div>
        
    )
}



