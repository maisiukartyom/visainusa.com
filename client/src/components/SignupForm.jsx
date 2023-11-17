import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const SignupForm = ({ submitForm }) => {    

    const { handleChange, handlePhoneChange, handleFormSubmit, values, errors} = useForm(
        submitForm
    );

    return (
        <div className="app-wrapper-main-signnn">
            
            <div className="app-wrapper-sign">
            <div className="logoForm-sign">
            <Link to="/"><img src="images/logo.png" alt="logo" width={70} height={94}/></Link>
          </div>
                <div>
                    <h2 className="title">Create Account</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="form-wrapper-sign">
                      <div className="email-log">
                      <div className="start">
                        <label className="label-log">Full name</label>
                        </div>
                        <input className="input-log" type="text" name="fullname" value={values.fullname} onChange={handleChange}/>
                        {errors.fullname && <p className="error">{errors.fullname}</p>}
                    </div>
                    <div className="email-log">
                    <div className="start">
                        <label className="label-log">Email</label>
                        </div>
                        <input className="input-log" autoComplete="email" type="email" name="email" value={values.email} onChange={handleChange}/>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="email-log">
                    <div className="start">
                        <label className="label-log">Password</label>
                        </div>
                        <input className="input-log" autoComplete="current-password" type="password" name="password" value={values.password} onChange={handleChange}/>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="email-log">
                        <div className="start">
                        <label className="label-log">Age</label>
                        </div>
                        <input className="input-log" type="number" name="age" min="0" max="100" value={values.age} onChange={handleChange}/>
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <div className="password-log">
                    <div className="start">
                        <label className="label-log ">Phone number</label>
                        </div>
                        <PhoneInput className="input-log react-tel-input form-control"
                            country={'ru'}
                            value={values.phoneNumber}
                            onChange={handlePhoneChange}
                            inputProps={{name: 'phoneNumber',
                                        required: true,}}   
                            />
                        {errors.phoneNumber && <p className="error-left">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                    <label className="check-sign">
                            <input  type="checkbox" />
                            <p className="mini-text">I read and accept term and conditions</p>
                    </label>
                        <button className="submit">Sign Up</button>
                    </div>
                </form>
            
                </div>
        </div>
    )
}

export default SignupForm;