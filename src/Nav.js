import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = ({ user, logout }) => {
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
      {user ? (
        <NavLink exact to="/" onClick={logout}>
          logout <span>{user.username}</span>
        </NavLink>
      ) : (
        <div>
        <NavLink exact to="/login">
          Login
        </NavLink>
        <NavLink exact to="/signup">
          Sign Up
        </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Nav;
