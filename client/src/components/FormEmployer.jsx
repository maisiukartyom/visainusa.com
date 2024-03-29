import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../src/pages/ForEmployer/ForEmployer.css';
import axios from "../api/axios";
import {toast} from 'react-toastify'
import PhoneInput, {isValidPhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


const FormEmployer = () =>  {

    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);
        if(errors.company === "" && errors.email === "" && errors.phoneNumber === "") {
            try{
                await axios.post("/email/sendEmployerInfo", {
                    email: email,
                    phoneNumber: formatPhoneNumberIntl(phoneNumber),
                    company: company,
                    comment: comment
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
                setComment("")
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
        // else{
        //     toast.warning("Form filled incorrect!", {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: false,
        //         progress: undefined,
        //         theme: "light",
        //         });
        // }
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

        if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
            error.phoneNumber = "Phone number is invalid"
        }
        else{
            error.phoneNumber = ""
        }

        return error;
    
    }
    return (

        <div className="app-wrapper-main-sum">
            <div className="app-wrapper-form">
                <div className="logoForm-sum">
                    <Link to="/"><img src="/images/logo.png" alt="logo" width={70} height={94}/></Link>
                </div>
                <div>
                    <h2 className="title-form">Have questions? <br></br> Fill in below form and we will reach out</h2>
                </div>
                <div className=" form-wrapper-sum">
                <form className="sum-form">
<div className="sum-right">
                    <div className="email-log-sum">
                            <div className="start">
                            <label htmlFor="email" className="label-log-sum">Company name</label>
                            </div>
                            <input required value={company} className="input-log-sum" onChange={(e) => setCompany(e.target.value)}/>
                            {errors.company && <p className="error">{errors.company}</p>}
                        </div>
                        <div className="email-log-sum">
                            <div className="start">
                            <label htmlFor="email" className="label-log-sum">Email</label>
                            </div>
                            <input required value={email} className="input-log-sum" type="email" onChange={(e) => setEmail(e.target.value)}/>
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>

                        <div className="email-log-sum">
                            <div className="start">
                                <label htmlFor="email" className="label-log-sum">Phone number</label>
                            </div>
                                <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="US"
                                value={phoneNumber}
                                onChange={setPhoneNumber}/>
                            {errors.phoneNumber && <p className="error-phone-left">{errors.phoneNumber}</p>}   
                        </div>

                        <div className="email-log-sum">
                            <div className="start">
                                <label htmlFor="email" className="label-log-sum">Comments</label>
                            </div>
                            <textarea className="comment-form input-log-sum" rows="4" onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                        </div>
                                                
                        <div className="btn-submit">
                            <button className="submit-send" onClick={handleSubmit}>Send</button>
                        </div>
                        </form>
                        </div>

                        </div>
            </div>
    )
}

export default FormEmployer;