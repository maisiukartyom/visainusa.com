import React, {useState} from "react";
import SignupForm from "./SignupForm";
import SignupFormSuccess from "./SignupFormSuccess"

const Form = () => {

    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm =() => {
        console.log("Sign up successful!")
        setFormIsSubmitted(true);
    };
    return (
        <div>
        { !formIsSubmitted ? (
        <SignupForm submitForm={submitForm} />
        ) : ( <SignupFormSuccess/> 
        )}
        </div>
    );
};

export default Form;