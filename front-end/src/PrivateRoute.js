import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    let isAuth = localStorage.getItem('auth');
    let token = localStorage.getItem('token');

    

    return (
        isAuth === 'true' ?  <Outlet />  : <Navigate to="signin"/>
    );
}

export default PrivateRoute;