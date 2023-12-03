import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import PhoneInput from 'react-phone-number-input'
import { useState } from "react";
import 'react-phone-number-input/style.css'


const SignupForm = () => {    
    const [agreed, setAgreed] = useState(false);

    const { handleChange, handlePhoneChange, handleFormSubmit, values, errors} = useForm(agreed);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        {showModal && (
        <div className="modal">
          <div className="modal-content agreement">
            <p className='agreement-text'>
              «LLC VISAINUSA» IS NOT A LAW FIRM, 
              DOES NOT PROVIDE LEGAL ADVICE AND IS 
              NOT A SUBSTITUTE FOR THE ADVICE OF 
              AN ATTORNEY. YOUR USE OF THE SITE 
              AND SERVICES, AND YOUR COMMUNICATION 
              WITH LLC VISAINUSA, DOES NOT CREATE 
              AN ATTORNEY-CLIENT RELATIONSHIP. 
              YOUR COMMUNICATIONS WITH LLC 
              VISAINUSA ARE NOT PROTECTED BY 
              THE ATTORNEY-CLIENT PRIVILEGE. 
              YOUR COMMUNICATIONS WITH THE 
              INDEPENDENT ATTORNEY ARE 
              GOVERNED BY YOUR AGREEMENT 
              WITH THAT ATTORNEY. We use information you submit to us at the time of account registration, such as your name and email address, and any updated information you subsequently submit, such as a new email address, to create and maintain your account. We may contact you using the contact information you provide in order to respond to inquiries you send to us, to communicate with you regarding our Services and the services of our partners, and to market our Services, or those of our partners, to you. If you are in the EU, we will only use your contact information to communicate with you regarding our partners’ services with your prior consent. LLC VISAINUSA does not share your Personal Information with third parties for their marketing purposes without your consent, we may share your information, including Personal Information, with third parties if you provide us with authorization to do so. We may share your Personal Information with third-party service providers, but only to the extent necessary for them to assist us in providing our Services. For example, if you purchase Services, we will share your Billing Information with third-party payment processors to the extent necessary to process your payment. We require all third-party service providers to protect the security of your Personal Information, to keep your Personal Information confidential, and to use such information for no other purposes. we may disclose your Personal Information as required by law, such as in response to a court order, subpoena, or similar legal process legally requiring us to produce the information. If legally permitted and feasible, we will give you notice of our receipt of a demand for your Personal Information and provide you a reasonable time in which to seek to quash such demand in court, or otherwise obtain a withdrawal or modification of the demand, before complying with the demand. We cannot guarantee that our security measures will prevent our computer systems from being accessed illegally, nor can we guarantee that the information on our computer systems will not be viewed or stolen. ACCORDINGLY, LLC VISA IN USA DISCLAIMS ALL LIABILITY FOR THE THEFT, INTERCEPTION, LOSS, OR UNAUTHORIZED ACCESS TO DAMAGE TO YOUR INFORMATION. YOU ACKNOWLEDGE THAT USE OF THE SITE AND SERVICES IS AT YOUR OWN RISK.
            </p>
            <button onClick={() => setShowModal(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
            <div className="app-wrapper-main-signnn">
                
                <div className="app-wrapper-sign">
                <div className="logoForm-sign">
                <Link to="/"><img src="/images/logo.png" alt="logo" width={70} height={94}/></Link>
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
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="RU"
                                value={values.phoneNumber}
                                onChange={handlePhoneChange}/>
                            {errors.phoneNumber && <p className="error-left">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                        <label className="check-sign">
                                <input value={agreed} onChange={() => setAgreed(!agreed)}  type="checkbox" />
                                <p onClick={(e) => { e.preventDefault(); setShowModal(true); }} className="mini-text-sign terms">I read and accept term and conditions</p>
                        </label>
                            <button className="submit">Sign Up</button>
                        </div>
                        <div className="login-here">
                        <p className="mini-text-sign">If you have already signed up, please log in </p>
                        <Link to="/login"><p className="here">here</p></Link>
                        </div>
                    </form>
                
                    </div>
            </div>
        </>
        
    )
}

export default SignupForm;
