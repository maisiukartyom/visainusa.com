import React, {useState} from 'react';
import { Header } from '../../components/Header';
import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';

import  './Job.css';



const Job = () => {
    const [selectedState, setSelectedState] = useState('');
    const [isChecked, setIsChecked] = useState(false);


    const handleStateClick = (stateName) => {
      setSelectedState(stateName);
      
    };
      
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }




    return (
        <div >
            <Header />
            <div className='pool-main'>
            

            <h1 className='pool'> Job offering pool</h1>
            <div className='pool-arrow'>

            <p className='text-pool'>All the job offers listed below do not belong to 'Visa in USA' LLC. We are
                 not affiliated with or represent any of the U.S. employers featured on this page.
                  You can apply for any job directly through the EB3 agency website, which offers sponsors.
                   Alternatively, you can apply here by clicking the 'Apply Now' button. Please be aware that, in this case,
                    in addition to the EB3 agency price, there is a charge of $1,500 for highly experienced personal assistant services. 
                    These assistants have firsthand knowledge and have personally gone through the EB3 unskilled process, obtaining green cards.
                     We will support you from the initial stages until you receive your green card, offering a range of services,
                 including but not limited to unlimited non-legal consultations.</p>
                 
                 </div>
<hr className='hr-pool'></hr>


<h3 className="choose-state ">Choose state</h3>


 
                                 
                 <div className='states-all'>
                 <img src='./images/america.png' className='map-states' alt='america' width={700} height={400}/>

                            <div className='states-right'>
                              <div className=" st b">
                            <input type="checkbox"   value="yes"/>Choose all
                            </div>
                              <div className="st" >
                            <input  type="checkbox"   id="answerEight" value="yes"/>South Carolina (SC)
                            </div>
                            <div className="st" >
                            <input  type="checkbox"   value="no"/>Colorado (CO)
                            </div>
                            <div className="st" >
                            <input  type="checkbox"   value="no"/>Minnesota (MN)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"   value="yes"/>North Carolina (NC)
                            </div>
                            <div className="st" checked={isChecked}   onChange={handleCheckboxChange}  onClick={() => handleStateClick('NewYork')}>
                            <input  type="checkbox"  value="yes"/>New York (NY)
                            </div>
                            <div className="st">
                            <input   type="checkbox"   value="yes"/>Arizona (AZ)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Florida (FL)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Indiana (IN)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Ohio (OH)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>New Jersey (NJ)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Delaware (DE)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>	North Dakota (ND)
                            </div>
                            </div>
                            <div className='states-left'>
                            <div className="st" >
                            <input  type="checkbox"    value="yes"/>Michigan (MI)
                            </div>
                            <div className="st" >
                            <input  type="checkbox"   value="yes"/>Missouri (MO)
                            </div>
                            <div className="st" >
                            <input  type="checkbox"  value="yes"/>Kansas (KS)
                            </div>
                            <div className="st">
                            <input   type="checkbox"   value="yes"/>Georgia (GA)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Utah (UT)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Washington (WA)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Idaho (ID)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Nevada (NV)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>New Mexico (NM)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Texas (TX)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Arkansas (AR)
                            </div>
                            <div  className="st">
                            <input  type="checkbox"  value="yes"/>Tennessee (TN)
                            </div>
                            
                            </div>
                            </div>
                            </div>
                            


                     

                       
{isChecked && (
  <div className='card-employer'>
    <div className='pad-emp'>
    <p className='location-emp'>East Northport, NY</p>
    <div className='img-emp'>
    <img className='img-page'  src='images/NY.jpg' alt='NY' width={300} height={350}/>
    </div>
    <div className='img-emp'>
    <h3 className='job'>Crew Member at Wendy's</h3>
    <p className='job'>$15.00/hr</p>
    <Link to='/jobinfo'><button className='btn-job'>Read more</button></Link>
    </div>
    </div>

  </div>
)}
     
            <Footer />
        </div>
    )
  }
  
  export default Job