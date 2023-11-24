import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../api/axios';
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const AddJob = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  //const [selectedFiles, setSelectedFiles] = useState([]);
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
      const formData = new FormData();
      formData.append('position', values.position);
      formData.append('location', values.location);
      formData.append('description', values.description);
      formData.append('wage', values.wage);
      // formData.append('cover', selectedFile);
      // formData.append('images', selectedFiles);

      try {
        const response = await axios.post(`/jobs/addJob?position=${values.position}&location=${values.location}`, formData, {
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

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const handleFileChange = (event) => {
    setCoverUrl(event.target.value);
  };

  // const handleFilesChange = (event) => {
  //   setSelectedFiles(Array.from(event.target.files));
  // };

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
  //   <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
  //   <form onSubmit={formik.handleSubmit}>
  //     <div>
  //       <label htmlFor="position">Position</label>
  //       <input
  //         type="text"
  //         id="position"
  //         name="position"
  //         onChange={formik.handleChange}
  //         value={formik.values.position}
  //         placeholder="Enter position name"
  //         style={{ display: 'block', marginBottom: '10px' }}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="location">Location</label>
  //       <input
  //         type="text"
  //         id="location"
  //         name="location"
  //         onChange={formik.handleChange}
  //         value={formik.values.location}
  //         placeholder="Enter location"
  //         style={{ display: 'block', marginBottom: '10px' }}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="state">State</label>
  //       <input
  //         type="text"
  //         id="state"
  //         name="state"
  //         onChange={formik.handleChange}
  //         value={formik.values.state}
  //         placeholder="Enter state name"
  //         style={{ display: 'block', marginBottom: '10px' }}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="wage">Wage</label>
  //       <input
  //         type="text"
  //         id="wage"
  //         name="wage"
  //         onChange={formik.handleChange}
  //         value={formik.values.wage}
  //         placeholder="Enter wage"
  //         style={{ display: 'block', marginBottom: '10px' }}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="description">Description</label>
  //       <textarea
  //         id="description"
  //         name="description"
  //         onChange={formik.handleChange}
  //         value={formik.values.description}
  //         placeholder="Enter job description"
  //         style={{ display: 'block', marginBottom: '10px' }}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="cover">Cover</label>
  //       <input type="url" 
  //         id="cover" 
  //         name="cover"
  //         onChange={handleFileChange} 
  //         style={{ display: 'block', marginBottom: '10px' }}/>
  //     </div>

  //     {/* <div> 
  //       <label htmlFor="images">Images</label>
  //       <input type="file" 
  //         id="images" 
  //         name="images" 
  //         multiple 
  //         onChange={handleFilesChange}
  //         accept='.jpg, .jpeg, .png'
  //         style={{ display: 'block', marginBottom: '10px' }} />
  //     </div> */}
  //       <div>
  //         <label>Images (JPEG and PNG only)</label>

  //         {/* Map over imageUrls to create input fields */}
  //         {imageUrls.map((url, index) => (
  //           <div key={index}>
  //             <input
  //               type="url"
  //               value={url}
  //               onChange={(e) => handleUrlChange(index, e.target.value)}
  //               placeholder={`Image URL ${index + 1}`}
  //               style={{ display: 'block', marginBottom: '10px' }}
  //             />

  //             {/* Show Remove button only if there's more than one input field */}
  //             {imageUrls.length > 1 && (
  //               <button type="button" onClick={() => handleRemoveInput(index)}>
  //                 Remove
  //               </button>
  //             )}
  //           </div>
  //         ))}

  //         <button type="button" onClick={handleAddInput}>
  //           Add
  //         </button>
  //       </div>

  //     <button type="submit">Submit</button>
  //   </form>
  // </div>
  // );
  <Container className="mt-4">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            id="position"
            name="position"
            onChange={formik.handleChange}
            value={formik.values.position}
            placeholder="Enter position name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            placeholder="Enter location"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            id="state"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
            placeholder="Enter state name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Wage</Form.Label>
          <Form.Control
            type="text"
            id="wage"
            name="wage"
            onChange={formik.handleChange}
            value={formik.values.wage}
            placeholder="Enter wage"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Enter job description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover</Form.Label>
          <InputGroup>
            <FormControl
              type="url"
              id="cover"
              name="cover"
              onChange={handleFileChange}
              placeholder="Enter cover URL"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>

          {imageUrls.map((url, index) => (
            <div key={index} className="mb-3">
              <InputGroup>
                <FormControl
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                />

                {imageUrls.length > 1 && (
                  <Button variant="outline-danger" onClick={() => handleRemoveInput(index)}>
                    Remove
                  </Button>
                )}
              </InputGroup>
            </div>
          ))}

          <Button variant="outline-primary" onClick={handleAddInput}>
            Add
          </Button>
        </Form.Group>

        <Button type="submit" variant="success">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddJob;