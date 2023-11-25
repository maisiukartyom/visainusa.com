import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../api/axios'
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from 'react-toastify'

function LoginForm(props)  {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [sendLink, setSendLink] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    const sendEmail = async () => {
        try{
            await axios.post('/register/sendLink', {email: email});
            toast.success("Email verification link has been sent!", {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
        catch(err){
            toast.error("Couldn't send verification link!", {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);
        if((errors.email === "") && (errors.password === "")) {
            try{
                const response = await axios.post("/auth",
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                setEmail('');
                setPassword('');
                if (state && state.previousPath !== "/signup" ){
                    navigate(-1);
                }
                else{
                    navigate("/")
                }   

                toast.success('Logged in!', {
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
            catch (err){
                console.log(err)
                let errorMessage = "";
                if (!err?.response) {
                    errorMessage = 'No Server Response'
                } else if (err.response?.status === 401) {
                    errorMessage = 'Invalid credentials!'
                } 
                else if (err.response?.status === 402){
                    errorMessage = 'Please verify your email!';
                    setSendLink(true);
                }
                else {
                    errorMessage = 'Login Failed'
                }

                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    })
            }
        }
}

const validate = () => {
    const error = {};

    if(!email) {
        error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        error.email = "Invalid email!";
    } else {
        error.email = "";
    }

    if(!password) {
        error.password = "Password is required";
    } else {
        error.password = "";
    }

    return error;
}

    return (
        <div className="app-wrapper-main-log">
            <div className="app-wrapper-loginn">
            <div className="logoForm">
            <Link to="/"><img src="/images/logo.png" alt="logo" width={70} height={94}/></Link> 
        </div>
                <div>
                    <h2 className="title">Log in</h2>
                </div>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="email-log">
                        <div className="start">
                        <label htmlFor="email" className="label-log">Email</label>
                        </div>
                        <input className="input-log" name="email" autoComplete="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>
                    <div className="password-log">
                        <div className="start">
                        <label htmlFor="email" className="label-log">Password</label>
                        </div>
                        <input className="input-log" name="password" autoComplete="current-password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <button className="submit">Log in</button>
                    </div>
                </form>
                {sendLink && <div><button style={{marginTop: "10px", backgroundColor: "green"}} className="submit" onClick={sendEmail}>send email</button></div> }
                    </div>
        </div>
    )
}

export default LoginForm;