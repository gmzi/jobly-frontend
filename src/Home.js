import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Home = ({ user }) => {
  const usr = useContext(UserContext);
  return (
    <div>
      {usr ? (
        <h1>Welcome to Jobly, {usr[1]}</h1>
      ) : (
        <div>
          {' '}
          :<h1>Welcome to Jobly</h1>
          <Link exact to="/login">
            <button>Login</button>
          </Link>
          <Link exact to="/signup">
            <button>Sign Up</button>
          </Link>{' '}
        </div>
      )}
    </div>
  );
};

export default Home;

