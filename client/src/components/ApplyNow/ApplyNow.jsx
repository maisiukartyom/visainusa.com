import React, {useState} from "react";
import { Link } from "react-router-dom";
import Contacts from "../Contacts";
import Footer from "../Footer";

import { Header } from "../Header";

import TextBlockA from "../TextBlockA";




const ApplyNow = () => {

    return(
        <div>
            <Header/>
            <div className="text-leveltwo">
      <h2 className="h2-level">Level 2</h2>
      
      
        <div className="levels">
<div className="level-first-block">

<TextBlockA className="text-levelApply" title="As individuals who have successfully navigated the EB3 process,
 we understand the potential roadblocks you may face, and we're here to share valuable experiences to optimize
  your budget and streamline your journey. Allow us to act as your representatives in dealings with the EB3 agency,
   saving you valuable time. Our deep understanding of the EB3 agency's structure and EB3 procedures ensures heightened attention
    to your case, adding reliability to your process. Serving as your personal assistant, our role extends across the entire EB3
     process, dedicated to making it as seamless as possible.  ..." description="How does it work? It's simple. You'll have
      a direct contract with the EB3 agency, and in addition, a separate contract with us, currently available at a special deal of $999 until March 2024 (originally valued at $1500). Our contract obligations include but are not limited to:"
      description1="- Unlimited 24/7 online support for the entire process in your first language. "
      description2="- Deep analysis of risk mitigation to identify bottlenecks at each step of your EB3 journey and provide recommendations."
      description3="- Timely tracking and monitoring of the application's progress and immediate notification of any requests for additional information."
      description4="- Detailed instructions and assistance in collecting, organizing, and verifying all essential documents."
      description5="- Guidance on preparing for immigration interviews to enhance confidence and readiness from the applicant's perspective."
      description6="- Exploring alternative options in case of unforeseen challenges and providing recommendations to overcome obstacles."
      description7="- Guidance on post-approval steps, including relocation, finding a house, opening a bank account, obtaining an SSN, securing a driver's license, and practical recommendations on fulfilling your 12-month commitment to your sponsor. "
     
     description8=" We will refund you if you are not satisfied with our service."
     
     description9="Your satisfaction is our priority, and we're dedicated to providing you with the assistance you require for a successful and stress-free EB3 immigration process. If you are interested in this service, please click the button below, and we will send you our contract. Once the payment is made, we will immediately start assisting you with creating a personal account on the EB3 agency website and help you choose the U.S. sponsor, explaining all the pros and cons of each job.
        " />

<div className="video-level">
<iframe    src="https://www.youtube.com/embed/ZOAMcjBvYCo?si=IiHAwWdsFiOXJg2C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
 clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen className="youtube-levelApply"></iframe> 
                </div> 
                </div>
                <div className="btn-Applynow">
                <button className="btn-apply">SEND ME CONTRACT</button>
                </div>
                </div>

        </div>
        <Contacts/>
            <Footer/>
        </div>
    )
}
export default ApplyNow