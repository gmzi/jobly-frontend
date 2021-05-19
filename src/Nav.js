import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink exact to="/Companies">
        Companies
      </NavLink>
      <NavLink exact to="/Jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/Profile">
        Profile
      </NavLink>
      <NavLink exact to="/logout">
        Log out
      </NavLink>
    </nav>
  );
};

export default Nav;
