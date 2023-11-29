const validation = (values) => {

    let errors={};

    if(!values.fullname){
        errors.fullname="Name is required"
    }
    else{
        errors.fullname = ""
    }
    if(!values.email){
        errors.email="Email is required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid!"
    }
    else{
        errors.email = ""
    }

    if(!values.password){
        errors.password="Password is required"
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(values.password)) {
        errors.password = "Password should have min 6 characters, letters and numbers!";
    }
    else{
        errors.password = ""
    }

    if (!values.age){
        errors.age="Age is required"
    }
    else if (Number(values.age) < 18){
        errors.age="You should be older than 18!"
    }
    else{
        errors.age = ""
    }

    if (!values.phoneNumber){
        errors.phoneNumber = "Phone number is required"
    }
    else{
        errors.phoneNumber = ""
    }
    return errors;

}

export default validation;