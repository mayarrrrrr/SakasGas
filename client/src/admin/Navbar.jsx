import { NavLink } from "react-router-dom"
import './navbar.css'

function AdminNavbar(){
    return (
        <div className="admin-navbar">
            <div className="nav-links-left">
                <NavLink className="nav-link" to='/admin'>Home</NavLink>
                
            </div>
            <div className="nav-text">
                <h1>E-Hub</h1>
            </div>
            <div className="nav-links-right">
                <NavLink className="nav-link" to="orders">Orders</NavLink>
                <NavLink className="nav-link" to="Logout">Logout</NavLink>
                
            </div>
        </div>
    )

}

export default AdminNavbar