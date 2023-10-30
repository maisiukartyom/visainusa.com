import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm()  {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
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

    if(!password) {
        error.password = "Password is required";
    } else if (password.length < 5) {
error.password = "Password not matched";
    } else {
        error.password = "";
    }

    return error;
}

    return (
        <div className="app-wrapper-main">
            <div className="logoForm">
            {/* Нажимая на logo переходим на главную страницу */}
            <Link to="/"><img src="images/logo.png" alt="logo" width={70} height={94}/></Link> 
        </div>
            <div className="app-wrapper">
                <div>
                    <h2 className="title">Log in</h2>
                </div>
                <form onSubmit={handleSubmit} className="form-wrapper">
                    <div className="email">
                        <label htmlFor="email" className="label">Email</label>
                        <input className="input" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>
                    <div className="password">
                        <label htmlFor="email" className="label">Password</label>
                        <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <button className="submit" >Log in</button>
                    </div>
                </form>
                    </div>
        </div>
    )
}

export default LoginForm;