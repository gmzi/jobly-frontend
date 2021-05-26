import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { UserContext } from './UserContext';

const Nav = ({ logout }) => {
  const user = useContext(UserContext);
  const usr = user.user;

  return (
    <nav className="Nav navbar navbar-expand-md">
      <a className="navbar-brand" href="/">
        Jobly
      </a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" exact to="/Companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" exact to="/Jobs">
            Jobs
          </NavLink>
        </li>
        {usr ? (
          <>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" exact to="/Profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" exact to="/" onClick={logout}>
                logout <span>{usr[1]}</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" exact to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" exact to="/signup">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
