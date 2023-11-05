import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const SignupForm = ({ submitForm }) => {    

    const { handleChange, handlePhoneChange, handleFormSubmit, values, errors} = useForm(
        submitForm
    );

    return (
        <div className="app-wrapper-main">
            
            <div className="app-wrapper">
            <div className="logoForm">
            <Link to="/"><img src="images/logo.png" alt="logo" width={70} height={94}/></Link>
          </div>
                <div>
                    <h2 className="title">Create Account</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="form-wrapper">
                    <div className="name">
                    <div>
                        <label className="label">Full name</label>
                        </div>
                        <input className="input" type="text" name="fullname" value={values.fullname} onChange={handleChange}/>
                        {errors.fullname && <p className="error">{errors.fullname}</p>}
                    </div>
                    <div className="email">
                    <div>
                        <label className="label">Email</label>
                        </div>
                        <input className="input" type="email" name="email" value={values.email} onChange={handleChange}/>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="password">
                    <div>
                        <label className="label">Password</label>
                        </div>
                        <input className="input" type="password" name="password" value={values.password} onChange={handleChange}/>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="age">
                        <div>
                        <label className="label">Age</label>
                        </div>
                        <input className="input" type="number" name="age" min="0" max="100" value={values.age} onChange={handleChange}/>
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <div className="phoneNumber">
                        <label className="label ">Phone number</label>
                        <PhoneInput className="number-input"
                            country={'ru'}
                            value={values.phoneNumber}
                            onChange={handlePhoneChange}
                            inputProps={{name: 'phoneNumber',
                                        required: true,}}   
                            />
                        {errors.phoneNumber && <p className="error-left">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                        <button className="submit">Sign Up</button>
                    </div>
                </form>
            
                </div>
        </div>
    )
}

export default SignupForm;