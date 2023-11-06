import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

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

  const handleInputChange2 = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async () => {
    if (email !== "" && phoneNumber !== ""){
        try{
            await axios.post("/checkout/sendEmail", {
                email: email,
                phoneNumber: phoneNumber
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
            toast.error("Couldn't send email to Alexey!", {
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
        toast.warning('You should fill both email and phone number!', {
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
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Contact Alexey</h2>
        <p><strong style={{color: "red"}}>It looks like you answered "YES" to one or more questions. 
          <br />
          Please fill in the form and we will reach out!</strong></p>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleInputChange1}
        />
        <Input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={handleInputChange2}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </PopUpContent>
    </PopUpBackground>
  );
};

export default PopUpForm;
