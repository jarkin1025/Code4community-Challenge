import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Container, Box } from '@mui/material';

/*
  A form for adding a new partner. When submitted, the form sends a POST request
  to the backend and calls the onAdd function with the new partner data.
*/

function AddPartnerForm({ onAdd }) {
  const [name, setName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPartner = { name, thumbnailUrl, description, active };
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartner),
    })
      .then((res) => res.json())
      .then((data) => onAdd(data)) // Call the onAdd function with the new partner data
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2,  maxWidth: '500px', margin: '0 auto' }}>
        <TextField 
          label="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <TextField 
          label="Thumbnail URL" 
          value={thumbnailUrl} 
          onChange={(e) => setThumbnailUrl(e.target.value)} 
          required 
        />
        <TextField 
          label="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          multiline 
          rows={4} 
          required 
        />
        <FormControlLabel 
          control={<Checkbox checked={active} onChange={() => setActive(!active)} />} 
          label="Active" 
        />
        <Button type="submit" variant="contained" color="primary">
          Add Partner
        </Button>
      </Box>
    </Container>
  );
}

export default AddPartnerForm;