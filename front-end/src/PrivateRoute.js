import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    let isAuth = localStorage.getItem('token')

    return (
        isAuth === null ? <Navigate to="signin"/> : <Outlet/>
    );
}

export default PrivateRoute;