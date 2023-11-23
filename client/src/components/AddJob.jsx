import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../api/axios';

const AddJob = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      position: '',
      location: '',
      wage: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('position', values.position);
      formData.append('location', values.location);
      formData.append('wage', values.wage);
      formData.append('cover', selectedFile);

      
      try {
        const response = await axios.post('/jobs/addJob', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Position:
        <input
          type="text"
          name="position"
          onChange={formik.handleChange}
          value={formik.values.position}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
      </label>

      <label>
        Wage:
        <input
          type="text"
          name="wage"
          onChange={formik.handleChange}
          value={formik.values.wage}
        />
      </label>

      <label>
        Cover:
        <input type="file" name="cover" onChange={handleFileChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJob;
