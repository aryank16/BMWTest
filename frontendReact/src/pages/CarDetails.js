import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Car Details
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {Object.keys(car)
            .filter((elem) => elem !== '_id' && elem !== '__v')
            .map((elem, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #eee',
                  pb: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {elem}:
                </Typography>
                <Typography variant="body1">{car[elem]}</Typography>
              </Box>
            ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ px: 3, py: 1 }}
          >
            Back to DataGrid
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CarDetails;