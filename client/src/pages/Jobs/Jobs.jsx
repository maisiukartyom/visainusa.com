import React, {useEffect, useState} from 'react';
import { Header } from '../../components/Header';
import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import axios from '../../api/axios';
import  './Jobs.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Contacts from '../../components/Contacts';


const allStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI','ID','IL', 'IN', 'IA',
'KS', 'KY', 'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE', 'NV','NH','NJ', 'NM','NY','NC','ND','OH',
'OK','OR','PA', 'RI','SC','SD', 'TN','TX','UT','VT','VA','WA','WV','WI','WY',]


const fullStates = ["Alabama (AL)",
"Alaska (AK)",
"Arizona (AZ)",
"Arkansas (AR)",
"California (CA)",
"Colorado (CO)",
"Connecticut (CT)",
"Delaware (DE)",
"Florida (FL)",
'Georgia (GA)',
"Guam (GU)",
"Hawaii (HI)",
'Idaho (ID)',
"Illinois (IL)",
"Indiana (IN)",
"Iowa (IA)",
'Kansas (KS)',
"Kentucky (KY)",
"Louisiana (LA)",
"Maine (ME)",
"Maryland (MD)",
"Massachusetts	 (MA)",
'Michigan (MI)',
"Minnesota (MN)",
"Mississippi (MS)",
'Missouri (MO)',
"Montana (MT)",
"Nebraska (NE)",
'Nevada (NV)',
"New Hampshire (NH)",
'New Jersey (NJ)',
'New Mexico (NM)',
"New York (NY)",
"North Carolina (NC)",
'North Dakota (ND)',
"Ohio (OH)",
"Oklahoma (OK)",
"Oregon (OR)",
"Pennsylvania (PA)",
"Rhode Island (RI)",
"South Carolina (SC)",
"South Dakota	(SD)",
"Tennessee (TN)",
'Texas (TX)',  
"Trust Territories	(TT)",
'Utah (UT)',  
"Vermont (VT)",
"Virginia (VA)", 
'Washington (WA)',
"West Virginia	 (WV)",
  "Wisconsin (WI)	",
  "Wyoming (WY)",
  ]

  const statesMap = {};

  for (let i = 0; i < allStates.length; i++) {
    statesMap[allStates[i]] = fullStates[i];
  }

const Jobs = () => {
    const [selectedStates, setSelectedStates] = useState([]);
    const [jobsData, setJobsData] = useState([{}]);
    const [isFetched, setIsFetched] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const fetchJobsData = async () => {
      try{
        const res = await axios.post("/jobs/getJobs", {states: selectedStates});
        setJobsData(res.data);
        setIsFetched(true)
      }
      catch(err){

      }
    }
      
    const handleCheckboxChange = async (value) => {
      const updatedCheckboxes = selectedStates.includes(value)
        ? selectedStates.filter((checkbox) => checkbox !== value)
        : [...selectedStates, value];
  
      setSelectedStates(updatedCheckboxes);
    };

    function scrollContainer(amount) {
      const container = document.getElementById('scrollContainer');
      container.scrollLeft += amount;
    }

    function toggleCheckboxes() {
      const selectAllCheckbox = document.getElementById('selectAll');
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
      });

      if (selectAllCheckbox.checked){
        setSelectedStates(allStates)
      }
      else{
        setSelectedStates([])
      }
    }

    useEffect(() => {
      const checkLevel = async () => {
        try{
            const res = await axios.post("/auth/verify", 
            {
               requiredLevel: 2
            },
            {
               withCredentials: true
            })
            setIsAdmin(res.data.isAdmin)
            setIsChecked(true)
        }
        catch{
            navigate("/");
            toast.error("You haven't purchased level 2!", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
    }
      checkLevel();
      fetchJobsData()
    }, [selectedStates]);


    const deleteJob = async (id) => {
      try{
        await axios.post("/jobs/deleteJob", {id});
        toast.success("Deleted job", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
        fetchJobsData()
      }
      catch(err){
        toast.error("Couldn't delet the job", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }
    }

    return (
        isChecked &&
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
              <div className='choose-all-st'>
              <div className=" st b">
          <input type="checkbox" id='selectAll' onChange={toggleCheckboxes}/>Choose all states
          </div>
          </div>

<div className='mob-states state-none'>
  <div className='state-one'>
        <div className='states-left'>
            <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('AL')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AL"/>Alabama (AL)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('AK')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AK"/>Alaska (AK)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('AZ')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AZ"/>Arizona (AZ)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('AR')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AR"/>Arkansas (AR)
          </div>
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('CA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="CA"/>California (CA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('CO')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="CO"/>Colorado (CO)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('CT')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="CT"/>Connecticut (CT)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('DE')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="DE"/>Delaware (DE)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('FL')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="FL"/>Florida (FL)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('GA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="GA"/>	Georgia (GA)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('HI')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="HI"/>Hawaii (HI)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('ID')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="ID"/>Idaho (ID)
          </div>
          </div>
          
          <div className='states-right'>
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('IL')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="IL"/>Illinois (IL)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('IN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="IN"/>Indiana (IN)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('IA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="IN"/>Iowa (IA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('KS')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="KS"/>Kansas (KS)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('KY')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="KY"/>Kentucky (KY)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('LA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="LA"/>Louisiana (LA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('ME')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="ME"/>Maine (ME)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('MD')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MD"/>Maryland (MD)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('MA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MA"/>Massachusetts	(MA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('MI')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MI"/>Michigan (MI)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MN"/>Minnesota (MN)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MS')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MS"/>Mississippi (MS)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MO')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MO"/>Missouri (MO)
          </div>
          </div>



          <div className='states-left'>
          
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('MT')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MT"/>Montana (MT)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NE')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NE"/>Nebraska (NE)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NV')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NV"/>Nevada (NV)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NH')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NH"/>New Hampshire (NH)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NJ')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NJ"/>New Jersey (NJ)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NM')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NM"/>New Mexico (NM)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NY')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NY"/>New York (NY)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NC')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NC"/>North Carolina (NC)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('ND')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="ND"/>North Dakota (ND)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('OH')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="OH"/>Ohio (OH)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('OK')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="OK"/>Oklahoma (OK)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('OR')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="TN"/>Oregon (OR)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('PA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="PA"/>Pennsylvania (PA)
          </div>
          </div>

          <div className='states-right'>
          
            
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('RI')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="RI"/>Rhode Island (RI)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('SC')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="SC"/>South Carolina (SC)
          </div>
          <div className="st">
            <input  type="checkbox" checked={selectedStates.includes('SD')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="SD"/>South Dakota (SD)
          </div>
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('TN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="TN"/>Tennessee (TN)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('TX')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="TX"/>Texas (TX)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('UT')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="UT"/>Utah (UT)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('VT')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="VT"/>Vermont (VT)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('VA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="VA"/>Virginia (VA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('WA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="WA"/>Washington (WA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('WV')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="WV"/>West Virginia	(WV)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('WI')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="WI"/>Wisconsin (WI)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('WY')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="WY"/>Wyoming (WY)
          </div>
          </div>
          </div>
          </div>



        </div>
        </div>
        {/* <button>SHOW</button> */}
                                       
              {isFetched && jobsData.map((state, index) => (
                <div className='cards'>

                    {state.jobPositions.length > 0 && 
                    <ScrollMenu 
                    Header={<h2 style={{textAlign: "center"}}>{statesMap[state.state]}</h2>}>
                      {state.jobPositions.map((job, index) => (
                          <div style={{marginTop: "10px", marginBottom: "10px", marginLeft: "15px"}}>
                              <div className='card-employer'>
                                <div className='pad-emp'>
                                  <p className='location-emp'>{job.location}</p>
                                  <div className='img-emp'>
                                    <img className='img-page'  src={job.coverImage} alt={job.state} width={300} height={350}/>
                                  </div>
                                  <div className='img-emp'>
                                    <h3 className='job'>{job.position}</h3>
                                    <p className='job'>${job.wage}/hr</p>
                                    <Link rel='noopener noreferrer' target='_blank' to={`/jobinfo/${job._id}`}><button className='btn-job'>Read more</button></Link>
                                    {isAdmin && 
                                      <div>
                                        <button 
                                        style={{marginTop: "5px", backgroundColor: "red"}}
                                        className='btn-job'
                                        onClick={() => deleteJob(job._id)}>Delete</button>
                                        <Link to={`/jobEdit/${job._id}`}><button 
                                        style={{marginTop: "5px", backgroundColor: "green"}}
                                        className='btn-job'>Edit</button></Link>
                                      </div>
                                    }
                                  </div>
                                </div>
                            </div>
                          </div>
                      ))}
                    </ScrollMenu>}
                </div>
              ))}
              <Contacts/>
            <Footer />
        </div>
    )
  }
  
  export default Jobs