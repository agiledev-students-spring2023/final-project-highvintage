import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    let isAuth = localStorage.getItem('token');

    return (
        isAuth ?  <Outlet />  : <Navigate to="signin"/>
    );
}

export default PrivateRoute;