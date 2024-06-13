import React, { useState } from 'react';
//import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, Chip } from '@mui/material';


/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData, onDelete, onUpdate}) {
  //are we currently editing
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(partnerData.name);
  const [thumbnailUrl, setThumbnailUrl] = useState(partnerData.thumbnailUrl);
  const [description, setDescription] = useState(partnerData.description);
  const [active, setActive] = useState(partnerData.active);

  const handleDelete = () => {
    fetch(`http://localhost:4000/${partnerData.name}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          onDelete(partnerData.name); // Call the onDelete function with the partner's name
        } else {
          console.error('Failed to delete partner');
        }
      })
      .catch((error) => console.error('Error:', error));
  };


  const handleEdit = () => {
    const updatedPartner = { name, thumbnailUrl, description, active };
    fetch(`http://localhost:4000/${partnerData.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPartner),
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdate(data);
        setIsEditing(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Container sx={{ mb: 2 }}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={partnerData.thumbnailUrl}
          alt={`${partnerData.name} logo`}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {partnerData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {partnerData.description}
          </Typography>
          {partnerData.active ? (
            <Chip label="Active" color="success" sx={{ mt: 1 }} />
          ) : (
            <Chip label="No Longer Active" color="default" sx={{ mt: 1 }} />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="small" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Partner</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="dense"
          />
          <FormControlLabel
            control={<Checkbox checked={active} onChange={() => setActive(!active)} />}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


export default PartnerTile;