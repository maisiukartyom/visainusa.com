
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useEffect, useState } from "react";
import axios from "../../api/axios";

import './Admin.css'

export const Admin = () => {

    const [verified, setVerified] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookie = async (level, forAdmin) => {
            try{
                await axios.post("auth/verify",
                    {
                        requiredLevel: level,
                        forAdmin: forAdmin
                    },
                    {
                        withCredentials: true
                    }
                )
                setVerified(true)
            }
            catch (err){
                toast.error("You're not an admin!",{
                    position: "top-center",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    }
                  )
              navigate("/")
            }
          }
          verifyCookie(0, true)
    }, [])

    return(
        verified && 
        <div className="center-screen">
            <Link to="/"><span className="header-logo"><img src={"/images/logo.png"} alt="logo" width={70} height={94}/></span></Link>
            <Link className="header-nav-item item-button-l login-l" to="/adminDashboard">
                Dashboard
            </Link>
            <Link className="header-nav-item item-button-l login-l" to="/addJob">
                Add job
            </Link>
            <Link className="header-nav-item item-button-l login-l" to="/jobs">
                Jobs pool
            </Link>
        </div>
     
    )
}