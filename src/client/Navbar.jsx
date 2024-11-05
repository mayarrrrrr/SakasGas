import './navbar.css'
import { NavLink } from "react-router-dom"
import { BiAlignRight } from 'react-icons/bi'
import { useContext } from 'react'
import { cartContext } from '../context/Context'

function ClientNavbar() {
    const { state } = useContext(cartContext);
    //console.log("Cart State From Navbar:", state);

    // Calculate total quantity of items in the cart
    //const totalQuantity = state.reduce((total, item) => total + item.quantity, 0);
    const totalQuantity = state.reduce((total, item) => total + item.quantity, 0);

    return (
        <section className='h-wrapper'>
            <div className="h-container">
                <NavLink to="/client">
                    <img src="/logo3.jpeg" alt="logo" className='log'/>
                </NavLink>
                <div className="h-menu">
                    <NavLink className="client-nav-link" to='/client/products'>Products</NavLink>
                    <NavLink className="client-nav-link" to="/client/order">Orders</NavLink>
                    <NavLink className="client-nav-link" to="/client/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z" />
                        </svg>
                    </NavLink>
                    <span className='bag-quantity'>
                        {totalQuantity}
                    </span>
                    
                    <button className='button' ><NavLink className="button-navlink"to="/client/logout">Logout</NavLink></button>
                </div>
            </div>
        </section>
    )
}

export default ClientNavbar



/*
import './navbar.css'
import { NavLink } from "react-router-dom"
import {BiAlignRight} from 'react-icons/bi'
//import {OutsideClickHandler} from 'react-outside-click-handler'
import { useState } from 'react'


function ClientNavbar(){
   // const [menuOpen, setMenuOpen] = useState(false)

   // const getMenuStyles = (menuOpen) => {
   //     if(document.documentElement.clientWidth <= 800){
   //         return {right: !menuOpen && '-100%'}
    //    }
    //}

    return (
        <section className='h-wrapper'>
            <div className="h-container">
                    <NavLink to="/client"> 
                        <img src="./e-hub logo.png" alt="logo" width={70} height={70} />
                    </NavLink>
                <div className="h-menu">
                    <NavLink className="client-nav-link" to='/client/products'>Products</NavLink>
                    <NavLink className="client-nav-link" to="/client/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z"/>
                        </svg>
                    </NavLink>
                    <span className='bag-quantity'>
                        <span>3</span>
                    </span>
                    <NavLink className="client-nav-link" to="/client/order">Orders</NavLink>
                    <button className='button'><NavLink to="/client/logout">Logout</NavLink></button>
                </div>
                {/*</OutsideClickHandler>
                <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
                <BiAlignRight size={30}/>
                </div>*
            </div>
            

        </section>
        
    )

}

export default ClientNavbar
*/