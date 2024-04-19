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
                <img src="./e-hub logo.png" alt="logo" width={100} />
                <div className="h-menu">
                    <NavLink className="client-nav-link" to='/client'>Home</NavLink> 
                    <NavLink className="client-nav-link" to='/client/products'>Products</NavLink>
                    <NavLink className="client-nav-link" to="/client/cart">Cart</NavLink>
                    <NavLink className="client-nav-link" to="/client/order">Orders</NavLink>
                    <button className='button'><NavLink to="/client/logout">Logout</NavLink></button>
                </div>
                {/*</OutsideClickHandler>
                <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
                <BiAlignRight size={30}/>
                </div>*/}
            </div>
            

        </section>
        
    )

}

export default ClientNavbar