import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Vidly</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavLink to="/movies" className="nav-item nav-link">Movies</NavLink>
                    <NavLink to="/customers" className="nav-item nav-link">Customers</NavLink>
                    <NavLink to="/rentals" className="nav-item nav-link">Rentals</NavLink>
                    

                    { !user && 
                        (<React.Fragment>
                            <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                            <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
                        </React.Fragment>)
                    }

                    { user && 
                        (<React.Fragment>
                            <NavLink to="/profile" className="nav-item nav-link">{user.name}</NavLink>
                            <NavLink to="/logout" className="nav-item nav-link">Logout</NavLink>
                        </React.Fragment>)
                    }

                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;