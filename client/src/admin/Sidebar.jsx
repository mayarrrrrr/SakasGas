import './sidebar.css'
import {UilEstate, UilClipboardAlt, UilSignOutAlt, UilPackage} from '@iconscout/react-unicons'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'

function Sidebar(){
    



    return(
        <div className="sidebar">
            {/*logo*/}
            <div className="logo">
                {/* <img src="/e-hub logo.png" alt="" /> */}
                <span>
                    <span className='bakeryname'>BONMAJ</span>
                </span>
            </div>
            {/*menu navigation*/}
            <div className="menu">
                <div className="menu-item">
                    
                    <NavLink className="nav-link" to='/admin'><UilEstate className="icon"/><span className='icon-name'>Dashboard</span></NavLink>  
                </div>
                <div className="menu-item ">
                    
                    <NavLink className="nav-link" to="orders"><UilClipboardAlt className="icon"/><span className='icon-name'>Orders</span></NavLink>
                    
                </div>
                <div className="menu-item">
                    
                    <NavLink className="nav-link" to="products">< UilPackage className="icon"/><span className='icon-name'>Products</span></NavLink>
                </div>
                {/* <div className="menu-item"> */}
                  
                    {/*dummy navlink*/}
                    {/* <NavLink className="nav-link" to="/nolink"><UilChart/><span>Chart</span></NavLink>
                    
                </div> */}
                <div className="menu-item">
                    
                    <NavLink className="nav-link" to="/login"><UilSignOutAlt/><span>Logout</span></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar