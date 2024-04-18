import React, { useEffect, useState } from "react";
import './clientProducts.css'

function ClientProducts(){
    const [products, setProducts] = useState([]);
    // http://127.0.0.1:5555/products
    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/products")
          .then(resp => resp.json())
          .then((data) => {
            setProducts(data);
            //console.log("Fetched jewelry data:", data); // Log the fetched data
          })
          .catch(error => {
            console.error('Error fetching products data:', error);
          });
      }, []);

    return (
        <div className='client-products'>
            <div className="flexColStart p-head">
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Categories</span>
            </div>
            <div className="client-products-content">
                <p>Showing all {products.length} results</p>
                <select>
                    <option value="Default">Default Sorting</option>
                    <option value="Title">Sort By Name</option>
                    <option value="Price-low">Sort By Price: low to high</option>
                    <option value="Price-high">Sort By Price: high to low</option>
                </select>
            </div>
            <div className="client-products-container">
                {products.map((products, index) => (
                    <div className="flexColStart p-card" key={products.index}>
                        <img src={products.image_url} alt="category"/>
                        <span className="secondaryText p-price">
                            <span style={{color:"orange"}}>$</span>
                            <span>{products.price}</span>
                        </span>
                        <span className='primaryText'>{products.name}</span>
                        <span className='secondaryText'>{products.description}</span>
                        <button className="p-buttons">Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ClientProducts