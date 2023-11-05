import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../api/axios'
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from 'react-toastify'

function LoginForm(props)  {
    const navigate = useNavigate();
    const {state} = useLocation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
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
                if (state.previousPath !== "/signup"){
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
                } else {
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
        <div className="app-wrapper-main">
            <div className="app-wrapper-login">
            <div className="logoForm">
            <Link to="/"><img src="images/logo.png" alt="logo" width={70} height={94}/></Link> 
        </div>
                <div>
                    <h2 className="title">Log in</h2>
                </div>
                <div className="form-wrapper">
                    <div className="email">
                        <div>
                        <label htmlFor="email" className="label">Email</label>
                        </div>
                        <input className="input" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>
                    <div className="password">
                        <div>
                        <label htmlFor="email" className="label">Password</label>
                        </div>
                        <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <button className="submit" onClick={handleSubmit}>Log in</button>
                    </div>
                </div>
                    </div>
        </div>
    )
}

export default LoginForm;