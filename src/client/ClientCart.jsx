import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { cartContext } from "../context/Context";
import Alert from "@mui/material/Alert"; // Import the Alert component
import "./clientCart.css";

function ClientCart() {
    const globalState = useContext(cartContext);
    const state = globalState.state;
    const dispatch = globalState.dispatch;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const total = state.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("https://bonmaj-backend.onrender.com/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    total: total,
                    items: state.map((item) => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                setSuccess(true);
                dispatch({ type: "CLEAR_CART" });
            } else {
                setError("Failed to place order");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while processing your request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="client-cart-page">
            {/* Display success alert if order was successful */}
            {success && (
                <Alert className="top-right-alert" severity="success">
                    Call 0795942191 for delivery.
                </Alert>
            )}
            {/* Display error alert if there was an error */}
            {error && (
                <Alert className="top-right-alert" severity="error">
                    {error}
                </Alert>
            )}

            {state.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <img src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/media/99db7af8c3d839dd65017f76ae434785.gif" alt="" />
                </div>            
            ) : (
                <>
                    <h2>Shopping Cart</h2>
                    <div className="client-cart">
                        <div className="client-cart-titles">
                            <h4>Product</h4>
                            <h4>Price</h4>
                            <h4>Quantity</h4>
                            <h4>Total</h4>
                        </div>
                        {state.map((item, index) => (
                            <div className="client-cart-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => dispatch({ type: "REMOVE", payload: item })}>Remove</button>
                                    </div>   
                                </div>
                                <p className="price">${item.price}</p>
                                <div className="quantity">
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            dispatch({ type: "DECREASE", payload: item });
                                        } else {
                                            dispatch({ type: "REMOVE", payload: item });
                                        }
                                    }}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch({ type: "INCREASE", payload: item })}>+</button>
                                </div>
                                <p className="total-price">Sh {item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>Sh {total}</h4>
                        </div>
                        <div className="checkout-button">
                            <button className="button" onClick={handlePlaceOrder} disabled={loading}>
                                {loading ? "Placing Order..." : "Order"}
                            </button>
                        </div>
                        <div className="continue-shopping">
                            <NavLink className="client-nav-link" to="/client/products">Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ClientCart;
