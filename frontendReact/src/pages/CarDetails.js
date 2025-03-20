import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/electric-cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error('Error fetching detail:', err));
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>Car Details</Typography>
      {
        Object.keys(car).filter((elem)=>elem!=='_id'&& elem!=='__v').map((elem,id)=>(
          <Typography key={id} variant="body1"><strong>{elem}:</strong> {car[elem]}</Typography>

        )) 
      }
      
     

      <Button variant="contained" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
        Back to DataGrid
      </Button>
    </Container>
  );
}

export default CarDetails;