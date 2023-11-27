import { useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {

    const {token} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        password: '',
        repeated: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (values.password === values.repeated){
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password)){
                try{
                    await axios.post('/auth/setPassword', {token, password: values.password});
                    toast.success("Password has been reset!", {
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/login");
                }
                catch(err){
                    toast.error("Reset token is invalid", {
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
            else{
                toast.warning("Password should have min 6 characters, letters and numbers!", {
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
        else{
            toast.warning("Passwords should match!", {
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

    return(
        <form onSubmit={handleFormSubmit} className="form-wrapper-sign">
            <div className="app-wrapper-main-signnn">
                <div className="app-wrapper-sign">
                    <div>
                        <h2 className="title">Reset password</h2>
                    </div>
                    <div className="email-log">
                        <div className="start">
                            <label className="label-log">New password</label>
                        </div>
                        <input className="input-log" type="password" name="password" value={values.password} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="email-log">
                        <div className="start">
                            <label className="label-log">Repeat password</label>
                        </div>
                        <input className="input-log" type="password" name="repeated" value={values.repeated} onChange={(e) => handleChange(e)}/>
                    </div>
                    <button className="submit">Reset</button>
                </div>
            </div>
            
        </form>
    )
}