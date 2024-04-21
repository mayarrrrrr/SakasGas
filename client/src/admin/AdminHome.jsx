import './adminHome.css'
import Cards from './Cards'

import Table from './Table'

function AdminHome(){
    return(
       <div className="main-dash">
            <span className='primaryText'>Welcome to your dashboard</span>
            <Cards/>
            <Table/>
       </div>
    )
}

export default AdminHome

/*
import Sidebar from './Sidebar'
import './adminHome.css'

function AdminHome(){
    return(
        <div className="admin-app">
            <div className="app-glass">
                <Sidebar/>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default AdminHome
*/