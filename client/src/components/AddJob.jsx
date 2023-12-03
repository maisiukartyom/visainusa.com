import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import axios from '../api/axios';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ButtonBack from '../pages/Admin/ButtonBack';
import { Link } from 'react-router-dom';
import { AdminEditor } from '../components/Editor';
import JoditEditor from "jodit-react";
import 'draft-js/dist/Draft.css';

// Container styles
const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Input and Select styles
const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// Button styles
const FormButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

// Image URL input and Remove button styles
const FormLabel = styled.label`
  margin-top: 10px;
  display: block;
  font-weight: bold;
`;

const FormRemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 3px;
  margin-bottom: 3px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const FormAddButton = styled.button`
  background-color: #472BFF;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 3px;
  margin-bottom: 5px;

  &:hover {
    background-color: #1F00E9;
  }
`;


const AddJob = () => {

  const [coverUrl, setCoverUrl] = useState('');
  const [description, setDescription] = useState();
  const [imageUrls, setImageUrls] = useState(['']);
  const [agenciesUrls, setAgenciesUrls] = useState(['']);
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      position: '',
      location: '',
      state: '',
      wage: '',
      description: ''
    },

    onSubmit: async (values) => {
      const formData = {
        position: values.position,
        location: values.location,
        state: values.state,
        wage: values.wage,
        description: description,
        coverImage: coverUrl,
        images: imageUrls,
        agencies: agenciesUrls
      }

      try {
        await axios.post('/jobs/addJob', formData);
        setCoverUrl('');
        setImageUrls(['']);
        setAgenciesUrls(['']);
        toast.success("Position has been added!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      } catch (error) {
        toast.error("Couldn't add new position!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }
    },
  });

  const handleFileChange = (event) => {
    setCoverUrl(event.target.value);
  };

  const handleUrlChange = (index, value, type) => {
    if (type === "image"){
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = value;
      setImageUrls(newImageUrls);
    }
    else if (type === "agency"){
      const newAgencyUrls = [...agenciesUrls];
      newAgencyUrls[index] = value;
      setAgenciesUrls(newAgencyUrls);
    }
  };

  const handleAddInput = (type) => {
    type === "image" ? 
    setImageUrls([...imageUrls, ''])
    : setAgenciesUrls([...agenciesUrls, '']); 
  };

  const handleRemoveInput = (index, type) => {
    if (type === "image"){
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index, 1);
      setImageUrls(newImageUrls);
    }
    else if (type === "agency"){
      const newAgencyUrls = [...agenciesUrls];
      newAgencyUrls.splice(index, 1);
      setAgenciesUrls(newAgencyUrls);
    }
  };

  useEffect(() => {
    const verifyCookie = async (level, forAdmin) => {
      try{
          await axios.post("auth/verify",
              {
                  requiredLevel: level,
                  forAdmin: forAdmin
              },
              {
                  withCredentials: true
              }
          )
          setVerified(true)
      }
      catch (err){
          toast.error("You're not an admin!",{
              position: "top-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              }
            )
        navigate("/")
      }
    }
    verifyCookie(0, true)
  })

  return (
    verified &&
    <>
      <Link to='/admin'>
        <ButtonBack>ADMIN</ButtonBack>
      </Link>
      <div style={{flexDirection: "row", display: "flex"}}>
        <FormContainer onSubmit={formik.handleSubmit}>
          <div>
            <FormLabel  htmlFor="position">Position</FormLabel >
            <FormInput 
              type="text"
              id="position"
              name="position"
              required
              onChange={formik.handleChange}
              value={formik.values.position}
              placeholder="Enter position name"
            />
          </div>

          <div>
            <FormLabel  htmlFor="location">Location</FormLabel >
            <FormInput 
              type="text"
              id="location"
              name="location"
              required
              onChange={formik.handleChange}
              value={formik.values.location}
              placeholder="Enter location"
            />
          </div>

        <div>
          <FormLabel  htmlFor="state">State</FormLabel >
          <FormSelect 
            id="state"
            name="state"
            required
            onChange={formik.handleChange}
            value={formik.values.state}
          >
              <option value="" label="Select a state" />
              <option value="AL" label="Alabama (AL)" />
              <option value="AK" label="Alaska (AK)" />
              <option value="AZ" label="Arizona (AZ)" />
              <option value="AR" label="Arkansas (AR)" />
              <option value="CA" label="California (CA)" />
              <option value="CO" label="Colorado (CO)" />
              <option value="CT" label="Connecticut (CT)" />
              <option value="DE" label="Delaware (DE)" />
              <option value="FL" label="Florida (FL)" />
              <option value="GA" label="Georgia (GA)" />
              <option value="HI" label="Hawaii (HI)" />
              <option value="ID" label="Idaho (ID)" />
              <option value="IL" label="Illinois (IL)" />
              <option value="IN" label="Indiana (IN)" />
              <option value="IA" label="Iowa (IA)" />
              <option value="KS" label="Kansas (KS)" />
              <option value="KY" label="Kentucky (KY)" />
              <option value="LA" label="Louisiana (LA)" />
              <option value="ME" label="Maine (ME)" />
              <option value="MD" label="Maryland (MD)" />
              <option value="MA" label="Massachusetts	(MA)" />
              <option value="MI" label="Michigan (MI)" />
              <option value="MN" label="Minnesota (MN)" />
              <option value="MS" label="Mississippi (MS)" />
              <option value="MO" label="Missouri (MO)" />
              <option value="MT" label="Montana (MT)" />
              <option value="NE" label="Nebraska (NE)" />
              <option value="NV" label="Nevada (NV)" />
              <option value="NH" label="New Hampshire (NH)" />
              <option value="NJ" label="New Jersey (NJ)" />
              <option value="NM" label="New Mexico (NM)" />
              <option value="NY" label="New York (NY)" />
              <option value="NC" label="North Carolina (NC)" />
              <option value="ND" label="North Dakota (ND)" />
              <option value="OH" label="Ohio (OH)" />
              <option value="OK" label="Oklahoma (OK)" />
              <option value="OR" label="Oregon (OR)" />
              <option value="PA" label="Pennsylvania (PA)" />
              <option value="RI" label="Rhode Island (RI)" />
              <option value="SC" label="South Carolina (SC)" />
              <option value="SD" label="South Dakota (SD)" />
              <option value="TN" label="Tennessee (TN)" />
              <option value="TX" label="Texas (TX)" />
              <option value="UT" label="Utah (UT)" />
              <option value="VT" label="Vermont (VT)" />
              <option value="VA" label="Virginia (VA)" />
              <option value="WA" label="Washington (WA)" />
              <option value="WV" label="West Virginia	(WV)" />
              <option value="WI" label="Wisconsin (WI)" />
              <option value="WY" label="Wyoming (WY)" />
          </FormSelect >
        </div>

          <div>
            <FormLabel  htmlFor="wage">Wage</FormLabel >
            <FormInput 
              type="text"
              id="wage"
              name="wage"
              required
              onChange={formik.handleChange}
              value={formik.values.wage}
              placeholder="Enter wage"
            />
          </div>

          <div>
            <FormLabel  htmlFor="cover">Cover</FormLabel >
            <FormInput  type="url" 
              id="cover" 
              name="cover"
              required
              value={coverUrl}
              onChange={handleFileChange} 
              placeholder="Cover image URL"/>
          </div>
            <div>
              <FormLabel >Images</FormLabel >

              {imageUrls.map((url, index) => (
                <div key={index} style={{display: 'flex', gap: '5px'}} >
                  <FormInput 
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value, "image")}
                    placeholder={`Image URL ${index + 1}`}
                  />

                  {imageUrls.length > 1 && (
                    <FormRemoveButton type="button" onClick={() => handleRemoveInput(index, "image")}>
                      Remove
                    </FormRemoveButton >
                  )}
                </div>
              ))}

              <FormAddButton  type="button" onClick={() => handleAddInput("image")}>
                Add
              </FormAddButton >
            </div>

            <div>
              <FormLabel >Agencies</FormLabel >

              {agenciesUrls.map((url, index) => (
                <div key={index} style={{display: 'flex', gap: '5px'}} >
                  <FormInput 
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value, "agency")}
                    placeholder={`Agency URL ${index + 1}`}
                  />

                  {agenciesUrls.length > 1 && (
                    <FormRemoveButton type="button" onClick={() => handleRemoveInput(index, "agency")}>
                      Remove
                    </FormRemoveButton >
                  )}
                </div>
              ))}

              <FormAddButton  type="button" onClick={() => handleAddInput("agency")}>
                Add
              </FormAddButton >
            </div>

          <FormButton  type="submit">Submit</FormButton >
        </FormContainer >
        <div>
              <div style={{marginTop: "15px"}} className='card-employer'>
                  <div className='pad-emp'>
                      <p className='location-emp'>{formik.values.location}</p>
                      <div className='img-emp'>
                      <img className='img-page'  src={coverUrl} alt={formik.values.state} width={300} height={350}/>
                      </div>
                      <div className='img-emp'>
                      <h3 className='job'>{formik.values.position}</h3>
                      <p className='job'>${formik.values.wage}/hr</p>
                      </div>
                  </div>
              </div>

              <div style={{marginTop: "15px"}} className="crew-main">
                  <div className='text-job-ny'>
                      <div className="big-text-main">
                          <h3 className="crew-one">{formik.values.position}</h3>
                          <p className="job">Job Details:</p>
                          {description && <div className='job-mini' dangerouslySetInnerHTML={{ __html: description }}></div>}
                          {agenciesUrls.map((agency, index) => (<a rel='noopener noreferrer' target='_blank' href={agency}>{agency}</a>))}
                      </div>
                  </div>
              </div>
          </div>
    </div>
        <AdminEditor setDescription={setDescription}/>
    </>
    
  );
};

export default AddJob;