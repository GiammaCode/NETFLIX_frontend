import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav>
        <h1>Netflix Clone</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/recommended">Recommended</Link></li>
        </ul>
    </nav>
);

export default Navbar;
