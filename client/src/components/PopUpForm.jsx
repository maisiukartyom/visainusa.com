import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import PhoneInput, {isValidPhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const PopUpBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;

const PopUpForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleInputChange1 = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber !== "" && isValidPhoneNumber(phoneNumber)){
        try{
            await axios.post("/email/sendEmail", {
                email: email,
                phoneNumber: formatPhoneNumberIntl(phoneNumber)
            })
            toast.success('Thank you, our team will get in touch with you soon!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              });
            onClose();
            navigate("/", {state: {hash: "pricing"}})
        }
        catch(error){
            toast.error("Couldn't send your email!", {
            position: "top-center",
            autoClose: 3000,
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
        toast.warning('Phone number is invalid!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <PopUpBackground>
      <PopUpContent>
        <form onSubmit={handleSubmit}>
          <CloseButton onClick={onClose}>X</CloseButton>
            <h2>Contact us</h2>
            <p><strong style={{color: "red"}}>It seems you haven't passed the pre-qualification test. 
              <br />
              Please fill in the form and we will reach out!</strong></p>
            <Input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange1}
            />
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={phoneNumber}
              onChange={setPhoneNumber}/>
            <Button>Send</Button>
        </form>
      </PopUpContent>
    </PopUpBackground>
  );
};

export default PopUpForm;
