import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import useForm from "../hooks/useForm";
import '../../src/pages/ForEmployer/ForEmployer.css';

const FormEmployer = ({ submitForm }) =>  {


    const { handlePhoneChange, values} = useForm(
        submitForm
    );


    const [email, setEmail] = useState('')
const [company, setCompany] = useState('')
const [time, setTime] = useState('')
const [errors, setErrors] = useState([])
const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    if(Object.keys(errors).length === 0) {
        alert("Done");
    }
}

const validate = () => {
    const error = {};

    if(!email) {
        error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
error.email = "Email not matched";
    } else {
        error.email = "";
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
                <div onSubmit={handleSubmit} className="form-wrapper">
                <div className="company">
                        <div >
                        <label htmlFor="email" className="label">Company name</label>
                        </div>
                        <input className="input-form" type="email" onChange={(e) => setCompany(e.target.value)}/>
                        {errors.company && <p className="error">{errors.company}</p>}
                    </div>
                    <div className="email-form">
                        <div>
                        <label htmlFor="email" className="label">Email</label>
                        </div>
                        <input className="input-form" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="email-form">
                        <div>
                        <label htmlFor="email" className="label">Convenient time</label>
                        </div>
                        <input className="input-form" type="time" onChange={(e) => setEmail(e.target.value)}/>
                        {errors.time && <p className="error">{errors.time}</p>}
                    </div>

                    <div className="email-form left-phone">
                        <div>
                        <label htmlFor="email" className="label left-form">Phone number</label>
                        </div>
                        <PhoneInput className=""
                            country={'us'}
                            value={values.phoneNumber}
                            onChange={handlePhoneChange}
                            inputProps={{name: 'phoneNumber',
                                        required: true,}}   
                            /></div>
                        {errors.phoneNumber && <p className="error-left">{errors.phoneNumber}</p>}
                    </div>

                  
                    
                    <div>
                        <button className="submit-send" >Send</button>
                    </div>
                </div>
</div>
                
        
    )
}

export default FormEmployer;