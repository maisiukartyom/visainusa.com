import {useState, useEffect} from "react";
import validation from "../utils/validation.js";
import axios from "../api/axios.js";
import {toast} from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import {formatPhoneNumberIntl} from 'react-phone-number-input'

const useForm = (agreed) => {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        age: "",
        phoneNumber: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }
    const handlePhoneChange = (value) => {
        setValues({
            ...values,
            phoneNumber: value
        })
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const curErrors = validation(values)
        setErrors(validation(values));
        if (!agreed){
            toast.warning("Please agree to terms and conditions!", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
            setDataIsCorrect(false)
        }

        if (Object.values(curErrors).every(value => value === "")){
            setDataIsCorrect(true);
        }
    };

    useEffect( () => {
        const register = async () => {
            try {
                values.phoneNumber = formatPhoneNumberIntl(values.phoneNumber);
                const result = await axios.post("/register",
                    JSON.stringify(values),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                toast.success("Email verification link has been sent!", {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                
                navigate("/login", {state: {previousPath: pathname}})
            }
            catch(err){
                let errorMessage = ""
                if (!err?.response) {
                    errorMessage ='No Server Response';
                } else if (err.response?.status === 409) {
                    errorMessage = 'Email already registered!';
                } else {
                    errorMessage = 'Registration failed!'
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

            setValues({
                fullname: "",
                email: "",
                password: "",
                age: "",
                phoneNumber: ""
            })
        }
        
        if (dataIsCorrect){
            register();
        }
    }, [errors]);

    return {handleChange, handlePhoneChange, handleFormSubmit, errors, values};
};

export default useForm;