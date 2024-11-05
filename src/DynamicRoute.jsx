import React,{ useEffect } from 'react'

const DynamicRoute = ({element:Element, title}) => {

    useEffect(()=>{
        document.title = title
    },[title])

    return(
        <div>
            {/* Adjust styles as needed */}
            <Element></Element>
            {/* <img src="/mynewlogo.png"  />  */}
        </div>
    );
}

export default DynamicRoute;