import LeftProducts from './LeftProducts'
import RightProducts from './RightProducts'
import './adminProducts.css'

function AdminProducts(){
    return(
        <div className="admin-products-container">
            <div className="admin-products-section">
                <div className="left-products-container">
                    <LeftProducts/>
                </div>
                <div className="right-products-container">
                    <RightProducts/>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts


