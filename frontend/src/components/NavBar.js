import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <h1>Expense Tracker</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
