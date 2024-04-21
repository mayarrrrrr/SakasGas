import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './adminOrder.css';

const columns = [
  { id: 'order_id', label: 'Order ID', minWidth: 100 },
  { id: 'product_name', label: 'Product Name', minWidth: 170 },
  { id: 'product_price', label: 'Product Price', minWidth: 100 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

function EnhancedTable() {
  const [adminOrders, setAdminOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/adminOrders");
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setAdminOrders(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'delivered':
        return 'blue';
      case 'approved':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div className="order-container">
        <span className='primaryText'>Your Orders</span>
        <div className="order-table">
            <Paper style={{ width: '100%', heigh:'100%', overflow: 'hidden', boxShadow: '10px 10px 15px 0px rgba(0,0,0,0.64)', background:'rgb(247,247,247)',  borderRadius:32,  backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center" // Change alignment as needed
                          style={{ minWidth: column.minWidth,  backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={`${order.order_id}-${order.product_id}`}>
                          {columns.map((column) => {
                            const value = order[column.id];
                            if (column.id === 'status') {
                              return (
                                <TableCell key={column.id} align="center" style={{ color: getStatusColor(value) }}>
                                  {value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="center">
                                  {value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={adminOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </div>
    </div>
    
  );
}

export default EnhancedTable;


/*
WITH ADDITIONAL UPDATING OF THE STATUS 

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import './adminOrder.css';

const columns = [
    { id: 'order_id', label: 'Order ID', minWidth: 100 },
    { id: 'product_name', label: 'Product Name', minWidth: 170 },
    { id: 'product_price', label: 'Product Price', minWidth: 100 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];

function EnhancedTable() {
  const [adminOrders, setAdminOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/adminOrders");
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setAdminOrders(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/adminOrders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      fetchOrders(); // Fetch orders again to update the UI
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'delivered':
        return 'blue';
      case 'approved':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div className="order-container">
        <span className='primaryText'>Your Orders</span>
        <div className="order-table">
            <Paper sx={{ width: '100%', heigh:'100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell align="center">Actions</TableCell> {/* Add Actions column *
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={`${order.order_id}-${order.product_id}`}>
                          {columns.map((column) => {
                            const value = order[column.id];
                            if (column.id === 'status') {
                              return (
                                <TableCell key={column.id} align="center" style={{ color: getStatusColor(value)}}>
                                  {value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="center">
                                  {value}
                                </TableCell>
                              );
                            }
                          })}
                          <TableCell align="center"> {/* Actions column *
                            <Button onClick={() => handleStatusChange(order.order_id, 'approved')}>Approve</Button>
                            <Button onClick={() => handleStatusChange(order.order_id, 'delivered')}>Deliver</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={adminOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </div>
    </div>
  );
}

export default EnhancedTable;

*/



