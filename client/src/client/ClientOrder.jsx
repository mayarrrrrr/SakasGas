import React, { useEffect, useState } from 'react';
import './clientOrder.css';

function ClientOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5555/orders");
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders data:', error);
        }
    };

    return (
        <div className="client-order-container">
            {orders.map(order => (
                <div className="order-card" key={order.order_id}>
                    <h2>Order ID: {order.order_id}</h2>
                    <p>Status: <span className="order-status">{order.status}</span></p>
                    <p>Total Price: <span className="total-price">${order.total_price.toFixed(2)}</span></p>
                    <ul className="product-list">
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

/*
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
*/
