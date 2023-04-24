import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    let isAuth = sessionStorage.getItem("isLogged")

    return (
        isAuth != "true" ? <Navigate to="signin"/> : <Outlet/>
    );
}

export default PrivateRoute;