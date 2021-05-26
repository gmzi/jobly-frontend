import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Home.css';

const Home = () => {
  const user = useContext(UserContext);
  return (
    <div className="Home">
      <div className="container text-center">
        {user.user ? (
          <div>
            <h1 className="Home-brand">Jobly</h1>
            <h2 className="mb-4 font-weight-bold">
              Welcome back,{' '}
              <span className="Home-username">{user.user[2].username}</span>.
            </h2>
          </div>
        ) : (
          <div>
            <h1 className="Home-welcome">Welcome to Jobly</h1>
            <div className="Home-btnContainer">
              <Link
                className="btn btn-primary font-weight-bold"
                exact
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-primary font-weight-bold"
                exact
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
