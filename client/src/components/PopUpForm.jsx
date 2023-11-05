import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
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

const PopUpForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange1 = (e) => {
    setEmail(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setPhoneNumber(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email !== "" && phoneNumber !== ""){
        try{
            await axios.post("/checkout/sendEmail", {
                email: email,
                phoneNumber: phoneNumber
            })
            alert("Email with info has been sent to Alexey");
            navigate("/");
        }
        catch(error){
            alert("Couldn't send email to Alexey!")
        }
    }
    else{
        alert("You should fill both email and phone number!")
    }
  };

  return (
    <PopUpBackground>
      <PopUpContent>
        <h2>Contact Alexey</h2>
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
