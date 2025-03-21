import { AgGridReact } from 'ag-grid-react';

const DataGrid = ({rowData, columnData}) => {
   
    return (
       
        <AgGridReact
            rowData={rowData}
            columnDefs={columnData}
        />
  
    )

};


export default DataGrid