import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Home = () => {
  const user = useContext(UserContext);
  console.log(user.user);
  return (
    <div>
      {user.user ? (
        <div>
          <h1>Welcome to Jobly, {user.user[2].username}</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome to Jobly</h1>
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
