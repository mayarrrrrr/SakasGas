import { useContext, useState } from 'react';
import './clientCart.css';
import { cartContext } from '../context/Context';

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
            const res = await fetch('http://127.0.0.1:5555/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include the access token from local storage
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`, 
                },
                body: JSON.stringify({
                    total: total,
                    items: state.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                setSuccess(true);
                // Clear the cart after successful order placement
                dispatch({ type: 'CLEAR_CART' });
            } else {
                setError('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="client-cart">
            {state.map((item, index) => {
                return (
                    <div className="client-cart-card" key={index}>
                        <img src={item.image_url} alt="" />
                        <p>{item.name}</p>
                        <p>{item.quantity * item.price}</p>
                        <div className="quantity">
                            <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>+</button>
                            <p>{item.quantity}</p>
                            <button
                                onClick={() => {
                                    if (item.quantity > 1) {
                                        dispatch({ type: 'DECREASE', payload: item });
                                    } else {
                                        dispatch({ type: 'REMOVE', payload: item });
                                    }
                                }}
                            >
                                -
                            </button>
                        </div>
                        <h2 onClick={() => dispatch({ type: 'REMOVE', payload: item })}>X</h2>
                    </div>
                );
            })}
            {state.length > 0 && (
                <div className="total">
                    <h3>Subtotal</h3>
                    <h2>${total}</h2>
                </div>
            )}
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="checkout-button">
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
            {success && <p className="success">Order placed successfully!</p>}
        </div>
    );
}

export default ClientCart;

/*
import { useContext } from 'react'
import './clientCart.css'
import { cartContext } from '../context/Context'

function ClientCart(){

    const globalState = useContext(cartContext)
    const state = globalState.state
    const dispatch = globalState.dispatch
    
    const total = state.reduce((total, item) => {
        return (total + item.price * item.quantity)
    }, 0)



    return (
        <div className="client-cart">
            {state.map((item, index) =>{
                //console.log(item)
                return (
                    <div className="client-cart-card" key={index}>
                        <img src={item.image_url} alt="" />
                        <p>{item.name}</p>
                        
                        <p>{item.quantity*item.price}</p>
                        <div className="quantity">
                            <button onClick={() => dispatch({type:'INCREASE', payload:item})}>+</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => {
                                if (item.quantity> 1){
                                    dispatch({type:'DECREASE', payload:item})
                                } else{
                                    dispatch({type:'REMOVE', payload:item})
                                }
                            }}>-</button>
                        </div>
                        <h2 onClick={() => dispatch({type:'REMOVE', payload:item})}>X</h2>
                    </div>
                )
            })}
            {state.length>0 && 
            <div className='total'>
                <h3>Subtotal</h3>
                <h2>${total}</h2>
            </div>}
            <div className="checkout-button">
                <button>Place Order</button>
            </div>
        </div>
    )

}

export default ClientCart
*/