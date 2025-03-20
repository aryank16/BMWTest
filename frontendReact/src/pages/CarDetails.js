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
      <Typography variant="body1"><strong>Make:</strong> {car.make}</Typography>
      <Typography variant="body1"><strong>Model:</strong> {car.model}</Typography>
      <Typography variant="body1"><strong>Battery:</strong> {car.batteryCapacity}</Typography>
      <Typography variant="body1"><strong>Range:</strong> {car.range}</Typography>
      <Typography variant="body1"><strong>Price:</strong> {car.price}</Typography>
      {/* ...Add more fields if needed */}

      <Button variant="contained" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
        Back to DataGrid
      </Button>
    </Container>
  );
}

export default CarDetails;