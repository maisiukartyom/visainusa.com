import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../api/axios';
import styled from 'styled-components';
import {toast} from 'react-toastify';

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
  const [imageUrls, setImageUrls] = useState(['']);

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
        description: values.description,
        coverImage: coverUrl,
        images: imageUrls
      }

      try {
        await axios.post('/jobs/addJob', formData);
        setCoverUrl('');
        setImageUrls(['']);
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

  const handleUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleAddInput = () => {
    setImageUrls([...imageUrls, '']); // Add a new empty string to the array
  };

  const handleRemoveInput = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1); // Remove the element at the specified index
    setImageUrls(newImageUrls);
  };

  console.log(imageUrls, coverUrl)

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
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
            <option value="SC" label="South Carolina (SC)" />
            <option value="CO" label="Colorado (CO)" />
            <option value="MN" label="Minnesota (MN)" />
            <option value="NC" label="North Carolina (NC)" />
            <option value="NY" label="New York (NY)" />
            <option value="AZ" label="Arizona (AZ)" />
            <option value="FL" label="Florida (FL)" />
            <option value="IN" label="Indiana (IN)" />
            <option value="OH" label="Ohio (OH)" />
            <option value="NJ" label="New Jersey (NJ)" />
            <option value="DE" label="Delaware (DE)" />
            <option value="ND" label="North Dakota (ND)" />
            <option value="MI" label="Michigan (MI)" />
            <option value="MO" label="Missouri (MO)" />
            <option value="KS" label="Kansas (KS)" />
            <option value="GA" label="Georgia (GA)" />
            <option value="UT" label="Utah (UT)" />
            <option value="WA" label="Washington (WA)" />
            <option value="ID" label="Idaho (ID)" />
            <option value="NV" label="Nevada (NV)" />
            <option value="NM" label="New Mexico (NM)" />
            <option value="TX" label="Texas (TX)" />
            <option value="AR" label="Arkansas (AR)" />
            <option value="TN" label="Tennessee (TN)" />
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
          <FormLabel  htmlFor="description">Description</FormLabel >
          <FormTextArea 
            id="description"
            name="description"
            required
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Enter job description"
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
                  required
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                />

                {imageUrls.length > 1 && (
                  <FormRemoveButton type="button" onClick={() => handleRemoveInput(index)}>
                    Remove
                  </FormRemoveButton >
                )}
              </div>
            ))}

            <FormAddButton  type="button" onClick={handleAddInput}>
              Add
            </FormAddButton >
          </div>

        <FormButton  type="submit">Submit</FormButton >
      </FormContainer >
  </div>
  );
};

export default AddJob;