import React, { useState } from 'react';
import './CallForm.css';
import axios from '../../api/axios';
import {toast} from 'react-toastify';
import PhoneInput, {isValidPhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const CallForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (phoneNumber!=="" && isValidPhoneNumber(phoneNumber)){
      try{
        await axios.post("/email/sendPhone", {
          name: name,
          phone: formatPhoneNumberIntl(phoneNumber)
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
    }
    else{
      toast.warning("Phone number is invalid!", {
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
    
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    formVisible? (<div className="expanded-form">
    <span className="close-form" onClick={toggleForm}>X</span>
    <h2 className='h2'>REQUEST A CALL</h2>
    <p className='p'>Have questions? Let us reach out to you within 5 minutes to answer.</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
          <input
            required
            className='input-phone'
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
      </div>
      <div className="form-group">
        <PhoneInput
          className='input-ph'
          international
          countryCallingCodeEditable={false}
          defaultCountry="RU"
          value={phoneNumber}
          onChange={setPhoneNumber}/>
      </div>
      <button className='button-phone' type="submit">Receive Call</button>
    </form>
  </div>) : (<div className="call-form-container">
      <img src='/images/number-main.png' alt='icon' width={60} height={60} className="form-toggle" onClick={toggleForm} />
      </div>)
  );
};

export default CallForm;
