import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, FormControl, InputLabel, 
  Select, MenuItem, IconButton, Tooltip, Box 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DataGrid from '../components/dataGrid';
import { qwe } from '../constant';

function Home() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  // Filter state
  const [filterColumn, setFilterColumn] = useState('Brand');
  const [filterMode, setFilterMode] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    // Define columns (including Actions with MUI icons & tooltips)
    const cols = [
      { field: 'brand', headerName: 'Brand', sortable: true },
      { field: 'model', headerName: 'Model', sortable: true },
      { field: 'batteryCapacity', headerName: 'Battery (kWh)', sortable: true },
      { field: 'range', headerName: 'Range (km)', sortable: true },
      { field: 'price', headerName: 'Price ($)', sortable: true },
      {
        headerName: 'Actions',
        cellRenderer: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title="View">
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleView(params.data._id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={() => handleDelete(params.data._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ];
    setColumnDefs(cols);

    // Initial fetch
    fetchData();
  }, []);

  // Generic fetch with optional query params
  const fetchData = async (params = {}) => {
    try {
      const response = await axios.get('http://localhost:4000/api/electric-cars', { params });
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    fetchData({ search: searchTerm });
  };

  const handleFilter = () => {
    fetchData({ filterColumn, filterMode, filterValue });
  };

  const handleView = (id) => {
    window.location.href = `/details/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/electric-cars/${id}`);
      fetchData(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        BMW IT Internship - Generic DataGrid
      </Typography>

      {/* Search Box aligned to the right */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }}
        />
         <Button 
    variant="contained" 
    size="medium" 
    sx={{ minWidth: 120 }} 
    onClick={handleSearch}
  >
    Search
  </Button>
        
      </Box>

      {/* Filter UI aligned to the right */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <FormControl variant="outlined" size="small" sx={{ mr: 1, minWidth: 120 }}>
          <InputLabel>Column</InputLabel>
          <Select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            label="Column"
          >
            <MenuItem value="Brand">Brand</MenuItem>
            <MenuItem value="Model">Model</MenuItem>
            <MenuItem value="BatteryCapacity">Battery</MenuItem>
            <MenuItem value="Range">Range</MenuItem>
            <MenuItem value="Price">Price</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ mr: 1, minWidth: 120 }}>
          <InputLabel>Filter Mode</InputLabel>
          <Select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            label="Filter Mode"
          >
            <MenuItem value="contains">Contains</MenuItem>
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="startsWith">Starts With</MenuItem>
            <MenuItem value="endsWith">Ends With</MenuItem>
            <MenuItem value="isEmpty">Is Empty</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filter Value"
          variant="outlined"
          size="small"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          sx={{ mr: 1 }}
        />

<Button 
    variant="contained" 
    size="medium" 
    sx={{ minWidth: 120 }} 
    onClick={handleFilter}
  >
    Filter
  </Button>

       
      </Box>

      {/* AG Grid Table with MUI styling */}
      <Box
        className="ag-theme-alpine"
        sx={{
          height: 600,
          width: '100%',
          backgroundColor: '#f5f5f5',
          fontFamily: 'Roboto, sans-serif',
          // Center header cells
          '& .ag-header-cell': {
            display: 'flex',
            backgroundColor: '#1976d2',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          },
          '& .ag-header-cell-label': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          // Center all cells
          '& .ag-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
          },
          '& .ag-row': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .ag-row:hover': {
            backgroundColor: '#e3f2fd !important',
          },
        }}
      >
        <DataGrid
          rowData={rowData}
          columnData={[
            { field: "Brand" },
            { field: "Model" },
            { field: "AccelSec" },
            { field: "TopSpeed_KmH" },
            { field: "Range_Km" },
            { field: "Efficiency_WhKm" },
            { field: "FastCharge_KmH" },
            { field: "RapidCharge" },
            { field: "PowerTrain" },
            { field: "PlugType" },
            { field: "BodyStyle" },
            { field: "Segment" },
            { field: "Seats" },
            { field: "PriceEuro" },
            { field: "Date" },
            {
              headerName: 'Actions',
              cellRenderer: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Tooltip title="View">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleView(params.data._id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(params.data._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ),
            },
          ]}
        />
      </Box>
    </Container>
  );
}

export default Home;