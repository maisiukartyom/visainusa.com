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
      <span className="form-toggle" onClick={toggleForm}>
        Receive a Call
      </span>
      {formVisible && (
        <div className="expanded-form">
          <span className="close-form" onClick={toggleForm}>X</span>
          <h2 className='h2'>Receive a call</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className='input-phone'
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className='input-phone'
                type="tel"
                id="phone"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button className='button-phone' type="submit">Receive Call</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CallForm;
