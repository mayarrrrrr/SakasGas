import { Outlet, useLocation } from "react-router-dom";
import AdminHome from "./AdminHome";
import Sidebar from "./Sidebar";
import './admin.css'
import RightSide from './RightSide'
import AdminProducts from "./AdminProducts";

function Admin() {
    const location = useLocation();

    const renderHomePage = location.pathname === '/admin';
    const renderRightSide = location.pathname === '/admin'; 

    return (
        <div>
            <div className="admin-app">
                <div className="app-glass">
                    <Sidebar />
                    {renderHomePage && <AdminProducts/>}
                    {/*{renderRightSide && <RightSide/>} {/* Conditional rendering of RightSide */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;


/*

import AdminNavbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import AdminHome from "./AdminHome";
import Sidebar from "./Sidebar";
import './admin.css'
import RightSide from './RightSide'

function Admin() {
    const location = useLocation();

    const renderHomePage = location.pathname === '/admin';

    return (
        <div>
            <div className="admin-app">
                <div className="app-glass">
                <Sidebar />
                {renderHomePage && <AdminHome/>}
                <RightSide/>
                <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;
*/
/*
import AdminNavbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"
import AdminHome from "./AdminHome";
import Sidebar from "./Sidebar";

function Admin(){
    const location = useLocation();

    const renderHomePage = location.pathname === '/admin';
    return (
        <div>
           {/* <AdminNavbar/>*
            {renderHomePage && <AdminHome/>}
            <Outlet /> 
        </div>
    )

}

export default Admin
*/