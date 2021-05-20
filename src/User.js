import React, { useState, useEffect, useMemo } from 'react';
import JoblyApi from './apiHelper';
import Nav from './Nav';
import Routes from './Routes';
import { UserContext } from './UserContext';

const User = () => {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => user, [user]);

  useEffect(
    function () {
      const local = window.localStorage.getItem('currUser');
      setUser((user) => JSON.parse(local));
    },
    [window.localStorage.getItem('currUser')]
  );

  function retrieveUser() {}

  function updateLocalStorage(obj) {
    window.localStorage.setItem('currUser', JSON.stringify(obj));
  }

  function cleanLocalStorage() {
    window.localStorage.removeItem('currUser');
  }

  async function signUp(userData) {
    const newToken = await JoblyApi.register(userData);
    const newUser = [[newToken], [userData.username]];
    setUser((user) => newUser);
    // setCurrUser((currUser) => newUser);
    updateLocalStorage(newUser);
  }

  async function login(userData) {
    const newToken = await JoblyApi.login(userData);
    const newUser = [[newToken], [userData.username]];
    setUser((user) => newUser);
    updateLocalStorage(newUser);
  }

  function logout() {
    cleanLocalStorage();
    setUser((user) => null);
  }

  return (
    <div>
      <UserContext.Provider value={providerValue}>
        <Nav logout={logout} />
        <Routes signUp={signUp} login={login} />
      </UserContext.Provider>
    </div>
  );
};

export default User;
