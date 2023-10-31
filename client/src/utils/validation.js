const validation = (values) => {

    let errors={};

    if(!values.fullname){
        errors.fullname="Name is required"
    }
    if(!values.email){
        errors.email="Email is required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid!"
    }
    if(!values.password){
        errors.password="Password is required"
    } else if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)) {
        errors.password = "Password should have min 8 letters, special symbol, upper and lower caseletter and a number!";
    }
    if (!values.age){
        errors.age="Age is required"
    }
    else if (Number(values.age) < 18){
        errors.age="You should be older than 18!"
    }
    if (!values.phoneNumber){
        errors.phoneNumber = "Phone number is required"
    }
    return errors;

}

export default validation;