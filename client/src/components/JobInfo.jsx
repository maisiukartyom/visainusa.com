import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import '../pages/Jobs/Jobs.css'
import Slider from './Slider';
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


const JobInfo = () => {

    const [jobInfo, setJobInfo] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        const getJob = async () => {
            try{
                const res = await axios.get(`/jobs/getJob?id=${id}`);
                setJobInfo(res.data)
                setIsFetched(true);
            }
            catch{
                    
            }
        }
        const checkLevel = async () => {
            try{
                const res = await axios.post("/auth/verify", 
                {
                   requiredLevel: 2
                },
                {
                   withCredentials: true
                })
                setIsChecked(true);
                setIsAdmin(res.data.isAdmin);
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
        getJob();
    }, []);

   return (
    
        isChecked && 
        <div >
        <Header/>
        {isFetched && 
        (
        
        <div className="job-info">
        <div className="job-img">
            <Slider images={jobInfo.images}/>
        </div>
        <div className="crew-main">
        <div className="text-job-ny">
            <div className="big-text-main">
            <h3 className="crew-one">{jobInfo.position}</h3>
            <p className="job">Job Details:</p>
            {
                Object.entries(jobInfo.description).map(([key, value]) => 
                    (<p className="job-mini">- {key}: {value}</p>)
                )
            }
        {jobInfo.agencies.map((agency, index) => (<a rel='noopener noreferrer' target='_blank' href={agency}>{agency}</a>))}
            <div className="btn-dis">
                <button className="btn-job">Apply now</button>
            </div>
            {isAdmin && 
                <div className="btn-dis">
                    <div>
                        <Link to={`/jobEdit/${jobInfo._id}`}><button 
                        style={{marginTop: "5px", backgroundColor: "green"}}
                        className='btn-job'>Edit</button></Link>
                    </div>
                </div>
                }
            </div>
            </div>
        </div>
        </div>)}

        <Footer/>
        </div>
    )
}

export default JobInfo