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


const allStates = ['SC','CO','MN','NC','NY','AZ','FL','IN','OH','NJ',
'DE','ND','MI','MO','KS','GA','UT','WA','ID','NV','NM','TX','AR','TN'];

const fullStates = ["South Carolina (SC)",
  "Colorado (CO)",
  "Minnesota (MN)",
  "North Carolina (NC)",
  "New York (NY)",
  "Arizona (AZ)",
  "Florida (FL)",
  "Indiana (IN)",
  "Ohio (OH)",
  'New Jersey (NJ)',
  'Delaware (DE)',
  'North Dakota (ND)',
  'Michigan (MI)',
  'Missouri (MO)',
  'Kansas (KS)',
  'Georgia (GA)',
  'Utah (UT)',
  'Washington (WA)',
  'Idaho (ID)',
  'Nevada (NV)',
  'New Mexico (NM)',
  'Texas (TX)',
  'Arkansas (AR)',
  "Tennessee (TN)"]

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

        <div className='states-right'>
          <div className=" st b">
          <input type="checkbox" id='selectAll' onChange={toggleCheckboxes}/>Choose all
          </div>
            <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('SC')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="SC"/>South Carolina (SC)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('CO')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="CO"/>Colorado (CO)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MN"/>Minnesota (MN)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NC')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NC"/>North Carolina (NC)
          </div>
          <div className="st">
            <input  type="checkbox" checked={selectedStates.includes('NY')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NY"/>New York (NY)
          </div>
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('AZ')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AZ"/>Arizona (AZ)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('FL')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="FL"/>Florida (FL)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('IN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="IN"/>Indiana (IN)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('OH')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="OH"/>Ohio (OH)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NJ')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NJ"/>New Jersey (NJ)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('DE')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="DE"/>Delaware (DE)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('ND')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="ND"/>	North Dakota (ND)
          </div>
          </div>
          <div className='states-left'>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MI')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MI"/>Michigan (MI)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('MO')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="MO"/>Missouri (MO)
          </div>
          <div className="st" >
          <input  type="checkbox" checked={selectedStates.includes('KS')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="KS"/>Kansas (KS)
          </div>
          <div className="st">
          <input   type="checkbox" checked={selectedStates.includes('GA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="GA"/>Georgia (GA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('UT')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="UT"/>Utah (UT)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('WA')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="WA"/>Washington (WA)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('ID')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="ID"/>Idaho (ID)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NV')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NV"/>Nevada (NV)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('NM')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="NM"/>New Mexico (NM)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('TX')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="TX"/>Texas (TX)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('AR')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="AR"/>Arkansas (AR)
          </div>
          <div  className="st">
          <input  type="checkbox" checked={selectedStates.includes('TN')}  onChange={(e) => handleCheckboxChange(e.target.value)} value="TN"/>Tennessee (TN)
          </div>
          </div>
          </div>
        </div>
        {/* <button>SHOW</button> */}
                                       
              {isFetched && jobsData.map((state, index) => (
                <div>

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
            <Footer />
        </div>
    )
  }
  
  export default Jobs