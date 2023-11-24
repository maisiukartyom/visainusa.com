import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import '../pages/Jobs/Jobs.css'
import Slider from './Slider';
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const JobInfo = () => {

    const [jobInfo, setJobInfo] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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
                await axios.post("/auth/verify", 
                {
                   requiredLevel: 2
                },
                {
                   withCredentials: true
                })
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
        getJob();
    }, [])

   return (
        isChecked && 
        <div >
        <Header/>
        {isFetched && 
        (<div className="job-info">
        <div className="job-img">
        <Slider images={jobInfo.images}/>

        </div>
        <div className="crew-main">
        <div className="text-job-ny">
            <div className="big-text-main">
            <h3 className="crew-one">{jobInfo.position}</h3>
            <p className="job">{jobInfo.description}</p>
            {/* <p className="job">Job Details for Dishwasher:</p>
            <p className="job-mini">- Location: East Northport, NY</p>
            <p className="job-mini">- Wage: $15.00 /hr</p>

            <p className="big-text job-mini">- Job Duties: Your responsibilities will include taking orders, preparing food items, operating the cash register,
                maintaining a clean and organized work area, and providing friendly and efficient service to all customers.</p>

            <p className="job-mini">- Estimated filing date: Late January 2024</p> */}

        <div className="btn-dis">
            <button className="btn-job">Apply now</button>
            </div>
            </div>
            </div>
        </div>
        </div>)}

        <Footer/>
        </div>
    )
}

export default JobInfo