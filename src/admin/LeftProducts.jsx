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
import SaveIcon from '@mui/icons-material/Save';
import InputBase from '@mui/material/InputBase';

function EnhancedTable() {
  const [adminProducts, setAdminProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bonmaj-backend.onrender.com/adminProducts");
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setAdminProducts(data);
    } catch (error) {
      console.error('Error fetching products data:', error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://bonmaj-backend.onrender.com/adminProducts/${productId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      setAdminProducts(adminProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const response = await fetch(`https://bonmaj-backend.onrender.com/adminProducts/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setAdminProducts(adminProducts.map(product => (product.id === productId ? updatedProduct : product)));
      setEditProductId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setUpdatedProductData(product); // Load current product data for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredProducts = adminProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-container">
      <div className="order-table">
        <Paper style={{ boxShadow: '10px 10px 15px 0px rgba(0,0,0,0.64)', borderRadius: 32, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <div className="order-table-heading">
            {/* <span className='order-table-title' style={{fontSize:"20px",marginTop:"20px"}}>Products</span> */}
            <div className="left-search-bar" style={{marginLeft: 'auto', width: '200px',marginBottom:"10px",padding:"2px",height:"50px"}}>
              <InputBase
                placeholder="Search Products"
                inputProps={{ 'aria-label': 'search products' }}
                onChange={handleSearch}
                style={{ borderRadius: 10, width: '100%', padding: '10px', backgroundColor: '#f0f0f0' }}
              />
            </div>
          </div>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell> {/* Added Image Header */}
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                    <TableCell align="left">
                      <img src={product.image_url} alt={product.name} style={{ width: 50, height: 50 }} /> {/* Render Image */}
                    </TableCell>
                    <TableCell align="left">
                      {editProductId === product.id ? (
                        <InputBase
                          name="name"
                          value={updatedProductData.name}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      ) : (
                        product.name
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editProductId === product.id ? (
                        <InputBase
                          name="description"
                          value={updatedProductData.description}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      ) : (
                        product.description
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editProductId === product.id ? (
                        <InputBase
                          name="price"
                          value={updatedProductData.price}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      ) : (
                        `Sh${product.price}`
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editProductId === product.id ? (
                        <InputBase
                          name="quantity_available"
                          value={updatedProductData.quantity_available}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      ) : (
                        product.quantity_available
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editProductId === product.id ? (
                        <Button startIcon={<SaveIcon />} onClick={() => handleUpdateProduct(product.id)}>
                          Save
                        </Button>
                      ) : (
                        <Button startIcon={<EditIcon />} onClick={() => handleEditClick(product)}>
                          Edit
                        </Button>
                      )}
                      <Button startIcon={<DeleteIcon style={{ color: 'red' }} />} onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
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



