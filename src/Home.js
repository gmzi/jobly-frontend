import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return <div>{user ? <h1>Welcome, {user.username}</h1> : 
  <div>
    <h1>Welcome to Jobly</h1>
    <Link exact to="/login">
  <button>Login</button>
</Link>
<Link exact to="/signup">
  <button>Sign Up</button>
</Link> </div>}

</div>;
};

export default Home;

/**
 * 
 * <Link exact to="/login">
          <button>Login</button>
        </Link>
        <Link exact to="/signup">
          <button>Sign Up</button>
        </Link>
 */
