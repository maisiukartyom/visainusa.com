import React, { useState } from 'react';
import './CallForm.css';
import axios from '../../api/axios';
import {toast} from 'react-toastify'

const CallForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("/email/sendPhone", {
        name: name,
        phone: phoneNumber
      })

      toast.success("We'll be in touch soon!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });

      setFormVisible(false)
    }
    catch{
      toast.error("Couldn't send your information", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
    setName('');
    setPhoneNumber('');
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="call-form-container">

<img src='images/number-main.png' alt='icon' width={60} height={60} className="form-toggle" onClick={toggleForm} />
        
      {formVisible && (
        <div className="expanded-form">
          
          <form  onSubmit={handleSubmit}>
          <span className="close-form" onClick={toggleForm}>X</span>
          <h2 className='h2'>Have questions?</h2>
          <h4 className='h4'>We wiil call you back within 5 minutes</h4>
          

              <input
                className='input-name'
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className='input-phone'
                type="tel"
                id="phone"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

<div>
             <button className='button-phone' type="submit">Receive Call</button> 
             </div>
          </form>

        </div>
      )}
    </div>
  );
};

export default CallForm;
