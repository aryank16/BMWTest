import { AgGridReact } from 'ag-grid-react';

const DataGrid = ({rowData, columnData}) => {
   
    return (
        // <div style={{ height: 500 }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnData}
        />
    // </div>
    )

};


export default DataGrid