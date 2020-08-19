import React from 'react';
import auth from '../../services/authService';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (  
        <Route 
            {...rest}
            render={props => {
                if(!auth.currentUser()) return <Redirect to="/login" />
                return Component ? <Component {...props} /> : render(props);
            }} 
        />
    );
}
 
export default ProtectedRoute;