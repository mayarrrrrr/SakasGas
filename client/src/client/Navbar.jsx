import './navbar.css'
import { NavLink } from "react-router-dom"


function ClientNavbar(){
    return (
        <section className='h-wrapper'>
            <div className="flexCenter h-container">
                <img src="./e-hub logo.png" alt="logo" width={100} />
                <div className="flexCenter h-menu">
                    <NavLink className="client-nav-link" to='/client'>Home</NavLink> 
                    <NavLink className="client-nav-link" to='/client/products'>Products</NavLink>
                    <NavLink className="client-nav-link" to="/client/cart">Cart</NavLink>
                    <NavLink className="client-nav-link" to="/client/order">Orders</NavLink>
                    <NavLink className="client-nav-link" to="/client/logout">Logout</NavLink>
                </div>

            </div>

        </section>
        
    )

}

export default ClientNavbar