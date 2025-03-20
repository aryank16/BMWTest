import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataGrid from '../components/dataGrid';
import { qwe } from '../constant';

function Home() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  // Filter state
  const [filterColumn, setFilterColumn] = useState('make');
  const [filterMode, setFilterMode] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    // Define columns (including Actions)
    const cols = [
      { field: 'make', headerName: 'Make', sortable: true },
      { field: 'model', headerName: 'Model', sortable: true },
      { field: 'batteryCapacity', headerName: 'Battery (kWh)', sortable: true },
      { field: 'range', headerName: 'Range (km)', sortable: true },
      { field: 'price', headerName: 'Price ($)', sortable: true },
      {
        headerName: 'Actions',
        cellRendererFramework: (params) => (
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleView(params.data._id)}
              style={{ marginRight: '0.5rem' }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(params.data._id)}
            >
              Delete
            </Button>
          </div>
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
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        BMW IT Internship - Generic DataGrid
      </Typography>

      {/* Search Box */}
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Filter UI */}
      <div style={{ marginBottom: '1rem' }}>
        <FormControl variant="outlined" size="small" style={{ marginRight: '0.5rem' }}>
          <InputLabel>Column</InputLabel>
          <Select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            label="Column"
          >
            <MenuItem value="make">Make</MenuItem>
            <MenuItem value="model">Model</MenuItem>
            <MenuItem value="batteryCapacity">Battery</MenuItem>
            <MenuItem value="range">Range</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            {/* Adjust as needed */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ marginRight: '0.5rem' }}>
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
          style={{ marginRight: '0.5rem' }}
        />

        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
        {/* <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={10}
        /> */}
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
            { field: "Date" }
          ]}
        

        ></DataGrid>
      </div>


    </Container>
  );
}

export default Home;