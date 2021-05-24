import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { UserContext } from './UserContext';

const Nav = ({ logout }) => {
  const user = useContext(UserContext);
  const usr = user.user;

  return (
    <nav className="Nav">
      <NavLink exact to="/Companies">
        Companies
      </NavLink>
      <NavLink exact to="/Jobs">
        Jobs
      </NavLink>
      {usr ? (
        <>
          <NavLink exact to="/Profile">
            Profile
          </NavLink>
          <NavLink exact to="/" onClick={logout}>
            logout <span>{usr[1]}</span>
          </NavLink>
        </>
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
