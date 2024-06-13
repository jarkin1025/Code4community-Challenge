import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddPartnerForm from './AddPartnerForm';
import { Container, Grid, Typography} from '@mui/material';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState([]);

  // Load all partners on initial page load 
  //using GET request to fetch the partners data from the backend
  useEffect(() => {
    fetch('http://localhost:4000')
      .then((res) => res.json())
      .then((data) => setPartners(Object.values(data))); //converting the partners object to an array
  }, []);

  //add a new partner to the state - had to research spread operator to understand this
  const addPartner = (partner) => {
    setPartners([...partners, partner]);
  };

  //delete the partner from the state by filtering out the partner with the given name
  const deletePartner = (name) => {
    setPartners(partners.filter((partner) => partner.name !== name));
  }

  // Update a partner in the state
  const updatePartner = (updatedPartner) => {
    setPartners(partners.map(partner => (partner.name === updatedPartner.name ? updatedPartner : partner)));
  };
  

  //render partner tile for each partner in the partners array
  return (
    <Container sx={{ mt: 4 }}>
      <AddPartnerForm onAdd={addPartner} />
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        {partners.map((partner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PartnerTile partnerData={partner} onDelete={deletePartner} onUpdate={updatePartner} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;