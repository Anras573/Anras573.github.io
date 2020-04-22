import React from 'react';
import { NavLink } from "react-router-dom";

import './header.scss';

function Header() {
    return (
        <nav className='header'>
            <ul>
                <li>
                    <NavLink exact to="/">Home <hr /></NavLink>
                </li>
                <li>
                    <NavLink to="/about/">About <hr /></NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
