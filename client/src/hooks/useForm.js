import {useState, useEffect} from "react";
import validation from "../utils/validation.js";
import axios from "../api/axios.js";

const useForm = (submitForm) =>{

    const [values, setValues] = useState({
        fullname: "",
        email: "",
        age: "",
        phoneNumber: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }
    const handlePhoneChange = (value, country, event) => {
        setValues({
            ...values,
            [event.target.name]: value
        })
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        setDataIsCorrect(true);
    };

    useEffect( () => {
        const register = async () => {
            try {
                await axios.post("/register",
                    JSON.stringify(values),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
            }
            catch(err){
                if (!err?.response) {
                    alert('No Server Response');
                } else if (err.response?.status === 409) {
                    alert('Email already registered!');
                } else {
                    alert('Registration Failed')
                }
            }
        }
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            setValues({
                fullname: "",
                email: "",
                password: "",
                age: "",
                phoneNumber: ""
            })
            register();
            submitForm(true);
        }
    }, [errors]);

    return {handleChange, handlePhoneChange, handleFormSubmit, errors, values};
};

export default useForm;
