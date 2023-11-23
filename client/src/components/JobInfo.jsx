import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import '../pages/Job/Job.css'


const JobInfo = () => {



   return (

        <div >
    <Header/>
<div className="job-info">
<div className="job-img">
     <img className="img-ny" src="images/ny1.jpg" alt="ny" />
    <img  className="img-ny" src="images/ny2.jpg" alt="ny" />
    <img  className="img-ny" src="images/ny3.jpg" alt="ny" /> 
    <img  className="img-ny" src="images/ny4.jpg" alt="ny" /> 

</div>
<div className="crew-main">
<div className="text-job-ny">
    <div className="big-text-main">
    <h3 className="crew-one">Crew Member at Wendy's</h3>
    <p className="job">Job Details for Dishwasher:</p>
    <p className="job-mini">- Location: East Northport, NY</p>
    <p className="job-mini">- Wage: $15.00 /hr</p>

    <p className="big-text job-mini">- Job Duties: Your responsibilities will include taking orders, preparing food items, operating the cash register,
         maintaining a clean and organized work area, and providing friendly and efficient service to all customers.</p>

    <p className="job-mini">- Estimated filing date: Late January 2024</p>

<div className="btn-dis">
    <button className="btn-job">Apply now</button>
    </div>
    </div>
    </div>
</div>
</div>

<Footer/>
        </div>
    )
}

export default JobInfo