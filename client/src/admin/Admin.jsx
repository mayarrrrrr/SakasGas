import AdminNavbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"
import AdminHome from "./AdminHome";

function Admin(){
    const location = useLocation();

    const renderHomePage = location.pathname === '/admin';
    return (
        <div>
            <AdminNavbar/>
            {renderHomePage && <AdminHome/>}
            <Outlet /> 
        </div>
    )

}

export default Admin