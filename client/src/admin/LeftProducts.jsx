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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import './leftProducts.css';

function EnhancedTable() {
  const [adminProducts, setAdminProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bonmaj-backend.onrender.com/adminProducts");
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAdminProducts(data);
    } catch (error) {
      console.error('Error fetching products data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://bonmaj-backend.onrender.com/adminProducts/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // Remove the deleted product from the state
      setAdminProducts(adminProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = adminProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-container">
        <div className="order-table">
            <Paper style={{ width: '100%', height:'100%', overflow: 'hidden', boxShadow: '10px 10px 15px 0px rgba(0,0,0,0.64)', borderRadius:32, backgroundColor: 'rgba(255, 255, 255, 0.7)'  }}>
            <div className="order-table-heading">
                <span className='order-table-title'>Products</span>
                <div className="left-search-bar">
                    <InputBase
                        placeholder="Search Products"
                        inputProps={{ 'aria-label': 'search products' }}
                        onChange={handleSearch}
                        style={{ borderRadius: 10, width: '100%' }}
                    />
                </div>
            </div>
              <TableContainer sx={{ maxHeight: 550}}>
                <Table stickyHeader aria-label="sticky table" >
                  <TableHead >
                    <TableRow >
                      <TableCell align="left" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Product</TableCell>
                      <TableCell align="left" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Description</TableCell>
                      <TableCell align="left" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Price</TableCell>
                      <TableCell align="left" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Quantity</TableCell>
                      <TableCell align="left" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((product) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                          <TableCell align="left">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={product.image_url} alt={product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell align="left">{product.description}</TableCell>
                          <TableCell align="left">${product.price}</TableCell>
                          <TableCell align="left">{product.quantity_available}</TableCell>
                          <TableCell align="left">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/*<Button startIcon={<EditIcon/>} >
                                </Button>*/}
                                <Button startIcon={<DeleteIcon style={{color:'red'}}  />} onClick={() => handleDeleteProduct(product.id)}>
                                </Button>
                                
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredProducts.length}
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './adminOrder.css';

function EnhancedTable() {
  const [adminProducts, setAdminProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bonmaj-backend.onrender.com/adminProducts");
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAdminProducts(data);
    } catch (error) {
      console.error('Error fetching products data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://bonmaj-backend.onrender.com/adminProducts/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // Remove the deleted product from the state
      setAdminProducts(adminProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="order-container">
        
        <div className="order-table">
            <Paper style={{ width: '100%', height:'100%', overflow: 'hidden', boxShadow: '10px 10px 15px 0px rgba(0,0,0,0.64)' }}>
                <div className="order-table-heading">
                    <span>Admin Products</span>
                    

                </div>

              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminProducts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((product) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                          <TableCell align="center">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={product.image_url} alt={product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell align="center">{product.description}</TableCell>
                          <TableCell align="center">${product.price}</TableCell>
                          <TableCell align="center">{product.quantity_available}</TableCell>
                          <TableCell align="center">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button startIcon={<EditIcon/>} >
                                </Button>
                                <Button startIcon={<DeleteIcon style={{color:'red'}}  />} onClick={() => handleDeleteProduct(product.id)}>
                                </Button>
                                
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={adminProducts.length}
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



