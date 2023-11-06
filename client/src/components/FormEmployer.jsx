import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import '../../src/pages/ForEmployer/ForEmployer.css';
import axios from "../api/axios";
import {toast} from 'react-toastify'

const FormEmployer = () =>  {
    
    const handlePhoneChange = (value) => {
        setPhoneNumber(value)
    }

    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [time, setTime] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errors, setErrors] = useState([])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);
        if(errors.company === "" && errors.email === "" 
        && errors.time === "" && errors.phoneNumber === "") {
            try{
                await axios.post("/checkout/sendEmployerInfo", {
                    email: email,
                    phoneNumber: phoneNumber,
                    company: company,
                    time: time
                })

                toast.success("Your information has been successfully sent!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });

                setEmail("")
                setPhoneNumber("")
                setCompany("")
                setTime("")
            }
            catch(error){
                toast.error("Couldn't send your information", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
        else{
            toast.warning("Please fill all the fields", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const validate = () => {
        const error = {};


        if(!email) {
            error.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Email is not valid!";
        } else {
            error.email = "";
        }
        
        if (!company) {
            error.company = "Company name is required"
        }
        else{
            error.company = ""
        }

        if (!phoneNumber) {
            error.phoneNumber = "Phone number is required"
        }
        else{
            error.phoneNumber = ""
        }

        if (!time) {
            error.time = "Time is required"
        }
        else{
            error.time = ""
        }

        return error;
    
    }
    return (
        <div className="app-wrapper-form">
            <div className="app-wrapper-employer">
            <div className="logoForm-employer">
            <Link to="/"><img src="images/logo.png" alt="logo" width={70} height={94}/></Link>
            </div>
                <div>
                    <h2 className="title-form">Have questions? <br></br> Fill in below form and we will reach out</h2>
                </div>
                <div className="form-wrapper">
                <div className="company">
                        <div >
                        <label htmlFor="email" className="label">Company name</label>
                        </div>
                        <input value={company} className="input-form" onChange={(e) => setCompany(e.target.value)}/>
                        {/* {errors.company && <p className="error">{errors.company}</p>} */}
                    </div>
                    <div className="email-form">
                        <div>
                        <label htmlFor="email" className="label">Email</label>
                        </div>
                        <input value={email} className="input-form" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        {/* {errors.email && <p className="error">{errors.email}</p>} */}
                    </div>
                    <div className="email-form">
                        <div>
                        <label htmlFor="email" className="label">Convenient time</label>
                        </div>
                        <input value={time} className="input-form" type="time" onChange={(e) => setTime(e.target.value)}/>
                        {/* {errors.time && <p className="error">{errors.time}</p>} */}
                    </div>

                    <div className="email-form left-phone">
                        <div>
                        <label htmlFor="email" className="label left-form">Phone number</label>
                        </div>
                        <PhoneInput className=""
                            country={'us'}
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            inputProps={{name: 'phoneNumber',
                                        required: true,}}   
                            /></div>
                        {/* {errors.phoneNumber && <p className="error-phone-left">{errors.phoneNumber}</p>} */}
                    </div>
                    
                    <div>
                        <button className="submit-send" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
        </div>
                
        
    )
}

export default FormEmployer;