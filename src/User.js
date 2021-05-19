import React, { useState, useEffect } from 'react';
import JoblyApi from './apiHelper';
import Nav from './Nav';
import Routes from './Routes';

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  //   function checkUser() {
  //     if (JoblyApi.user) {
  //       setUser({ user: JoblyApi.user });
  //     }
  //   }

  async function signUp(userData) {
    const newToken = await JoblyApi.register(userData);
    const newUser = { token: newToken, username: userData.username };
    setUser((user) => newUser);
  }

  async function login(userData) {
    const newToken = await JoblyApi.login(userData);
    const newUser = { token: newToken, username: userData.username };
    setUser((user) => newUser);
  }

  function logout() {
    setUser((user) => null);
  }



  return (
    <div>
      <Nav user={user} logout={logout} />
      <Routes signUp={signUp} login={login} user={user} />
    </div>
  );
};

export default User;
