import './sidebar.css'
import {UilEstate, UilClipboardAlt, UilSignOutAlt, UilPackage, UilChart} from '@iconscout/react-unicons'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'

function Sidebar(){
    



    return(
        <div className="sidebar">
            {/*logo*/}
            <div className="logo">
                {/* <img src="/e-hub logo.png" alt="" /> */}
                <span>
                    <span>BONMAJ</span>
                </span>
            </div>
            {/*menu navigation*/}
            <div className="menu">
                <div className="menu-item">
                    <div className="icon">
                        <UilEstate/>
                    </div>
                    <NavLink className="nav-link" to='/admin'>Dashboard</NavLink>  
                </div>
                <div className="menu-item ">
                    <span>
                        <UilClipboardAlt/>
                    </span>
                    <NavLink className="nav-link" to="orders">Orders</NavLink>
                    
                </div>
                <div className="menu-item">
                    <div>
                        <UilPackage/>
                    </div>
                    <NavLink className="nav-link" to="products">Products</NavLink>
                </div>
                <div className="menu-item">
                    <div>
                        <UilChart/>
                    </div>
                    {/*dummy navlink*/}
                    <NavLink className="nav-link" to="/nolink">Charts</NavLink>
                    
                </div>
                <div className="menu-item">
                    <div>
                        <UilSignOutAlt/>
                    </div>
                    <NavLink className="nav-link" to="/login">Logout</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar