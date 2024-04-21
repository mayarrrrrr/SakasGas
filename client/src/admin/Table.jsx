import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './table.css'

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status  };
}

const rows = [
    createData("OnePlus", 18908421, "20 March 2024", "Delivered"),
    createData("iPhone 15 Pro", 18908424, "28 March 2024", "Approved"),
    createData("M3 Macbook Pro ", 18908424, "20 April 2024", "Pending"),
    createData("Canon EOS Rebel T7", 18908425, "24 April 2024", "Delivered"),
    createData("Sony Alpha A7 III", 18908427, "28 April 2024", "Approved"),
    createData("Apple Watch Series 8", 18908428, "30 April 2024", "Pending"),
  ];

  const makeStyle=(status)=>{
    if(status === 'Approved')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
       
      }
    }
    else if(status === 'Pending')
    {
      return{
        background: '#ffadad8f',
        color: 'red',
      }
    }
    else{
      return{
        background: '#59bfff',
        color: 'white',
      }
    }
  }
  
  

export default function BasicTable() {
  return (
    <div className="Table">
        <h4>Recent Orders</h4>
    <TableContainer component={Paper}
    style={{boxShadow: "0px 13px 20px 0px #80808029", backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Tracking ID</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.trackingId}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">
                <span className='status' style={makeStyle(row.status)}>{row.status}</span>
              </TableCell>
              <TableCell align="left" className='details'>Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  );
}

/*
import './table.css'


function Table(){
    return(
        <div className="table">
            <h3>Recent Orders</h3>
        </div>
    )
}

export default Table 

*/