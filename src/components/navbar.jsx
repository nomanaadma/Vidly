import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavLink to="/movies" className="nav-item nav-link">Movies</NavLink>
                    <NavLink to="/customers" className="nav-item nav-link">Customers</NavLink>
                    <NavLink to="/rentals" className="nav-item nav-link">Rentals</NavLink>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;