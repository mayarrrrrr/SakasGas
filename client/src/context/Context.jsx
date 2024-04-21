import { createContext, useReducer, useEffect } from "react";

export const cartContext = createContext();

export const Context = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                const tempState = state.filter((item) => action.payload.id === item.id)
                if (tempState.length > 0) {
                    return state
                } else {
                    return [...state, action.payload]
                }
            case 'INCREASE':
                const tempState1 = state.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
                return tempState1
            case 'DECREASE':
                const tempState2 = state.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
                return tempState2;
            case 'REMOVE':
                const tempState3 = state.filter((item) => item.id !== action.payload.id)
                return tempState3;
            case 'CLEAR_CART':
                return [];

            default: return state
        }
    }

    // Retrieve cart items from local storage on component mount
    const initialState = JSON.parse(localStorage.getItem('cartItems')) || [];

    const [state, dispatch] = useReducer(reducer, initialState);

    // Update local storage whenever cart state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state));
    }, [state]);

    const info = { state, dispatch };
    return (
        <cartContext.Provider value={info}>{props.children}</cartContext.Provider>
    );
};


/*
import { createContext, useReducer } from "react";

export const cartContext = createContext()

export const Context = (props) => {

    const reducer = (state, action) => {
        switch(action.type){
            case 'ADD':
                    const tempState = state.filter((item) => action.payload.id === item.id)
                    if(tempState.length > 0){
                        return state 
                    }else {
                        return [...state, action.payload]
                    }
                    case 'INCREASE':
                        const tempState1 = state.map((item) => {
                            if(item.id === action.payload.id){
                                return {...item, quantity: item.quantity+1}
                            } else{
                                return item 
                            }
                        })
                        return tempState1
                    case 'DECREASE':
                        const tempState2 = state.map((item) => {
                            if(item.id === action.payload.id){
                                return {...item, quantity: item.quantity - 1}
                            } else{
                                return item 
                            }
                        })
                        return tempState2;
                    case 'REMOVE':
                        const tempState3 = state.filter((item) => item.id !== action.payload.id)
                        return tempState3;
                    case 'CLEAR_CART':
                        return []; 
                        
                
            default: return state
        }
    }

    const [state, dispatch] = useReducer(reducer, [])
    const info={state, dispatch}
    return (
    <cartContext.Provider value={info}>{props.children}</cartContext.Provider>
    )

}
*/