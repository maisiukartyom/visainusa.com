import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

function LoginForm()  {

    const {setAuthentication} = useAuth();
    const navigate = useNavigate();
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
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                const level = response?.data?.level;
                //setAuth({ email, roles, level, accessToken });
                //setAuthentication({ email, roles, level, accessToken });
                setEmail('');
                setPassword('');
                navigate("/");
            }
            catch (err){
                console.log(err)
                if (!err?.response) {
                    alert('No Server Response');
                } else if (err.response?.status === 400) {
                    alert('Missing Email or Password');
                } else if (err.response?.status === 401) {
                    alert('Invalid credentials!');
                } else {
                    alert('Login Failed');
                }
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