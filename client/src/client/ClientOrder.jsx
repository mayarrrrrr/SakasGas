/*
import './clientOrder.css'
import React, { useContext, useEffect, useState } from "react";


function ClientOrder(){
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/orders")
          .then(resp => resp.json())
          .then((data) => {
            setOrders(data);
            //console.log("Fetched jewelry data:", data); // Log the fetched data
          })
          .catch(error => {
            console.error('Error fetching orders data:', error);
          });
      }, []);

    return(
        <div>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={order.id}>
                        <h1>{order.status}</h1>
                        <h2>{order.total_price}</h2>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    )

}

export default ClientOrder
*/

import React, { useEffect, useState } from 'react';

function ClientOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/orders")
          .then(resp => resp.json())
          .then((data) => {
            setOrders(data);
          })
          .catch(error => {
            console.error('Error fetching orders data:', error);
          });
    }, []);

    return (
        <div>
            {orders.map(order => (
                <div key={order.order_id}>
                    <h2>Order ID: {order.order_id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Total Price: ${order.total_price.toFixed(2)}</p>
                    <ul>
                        {order.products.map(product => (
                            <li key={product.name}>
                                {product.name} - Quantity: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ClientOrder;

