import React, { useState, useEffect, useMemo, useContext } from 'react';
import JoblyApi from './apiHelper';
import Nav from './Nav';
import Routes from './Routes';
import { UserContext } from './UserContext';
// import { ProfileContext } from './ProfileContext';
import { BrowserRouter } from 'react-router-dom';

const User = () => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [prevApps, setPrevApps] = useState();

  //   const userProviderValue = useMemo(
  //     () => ({ user, update, counter, increment }),
  //     [user]
  //   );
  const userProviderValue = {
    user,
    update,
    applyFront,
    prevApps,
    setPrevApps,
    counter,
    increment,
  };

  useEffect(
    async function () {
      const local = window.localStorage.getItem('currUser');
      const currUsr = JSON.parse(local);
      if (currUsr) {
        // const userData = await JoblyApi.getUser(currUsr[1], currUsr[0]);
        const userData = await JoblyApi.getUser(currUsr[1], currUsr[0]);
        console.log(userData.applications);
        setPrevApps((prevApps) => userData.applications);
        setUser((user) => [...currUsr, userData]);
      }
    },
    [token]
  );

  function increment() {
    setCounter((counter) => counter + 1);
  }
  function updateLocalStorage(obj) {
    window.localStorage.setItem('currUser', JSON.stringify(obj));
  }

  function cleanLocalStorage() {
    window.localStorage.removeItem('currUser');
  }

  async function signUp(userData) {
    const newToken = await JoblyApi.register(userData);
    const newUser = [[newToken], [userData.username]];
    setToken(newToken);
    updateLocalStorage(newUser);
  }

  async function login(userData) {
    const newToken = await JoblyApi.login(userData);
    console.log(newToken);
    const newUser = [[newToken], [userData.username]];
    setToken(newToken);
    updateLocalStorage(newUser);
  }

  async function update(form) {
    delete form.username;
    const updatedData = await JoblyApi.update(user[1][0], form);
    setUser((user) => (user[2] = updatedData));
    // return updatedData;
  }

  function logout() {
    cleanLocalStorage();
    JoblyApi.logout();
    setUser((user) => null);
    setToken((token) => null);
  }

  async function applyFront(jobId, username) {
    const result = await applyBack(username, jobId);
    console.log(result.applied);
    setPrevApps((prevApps) => [...prevApps, result.applied]);
  }

  async function applyBack(username, jobId) {
    const req = await JoblyApi.dbApply(username, jobId);
    setUser((user) => user);
    return req;
  }

  return (
    <div>
      <UserContext.Provider value={userProviderValue}>
        <BrowserRouter>
          <Nav logout={logout} />
          <Routes signUp={signUp} login={login} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default User;
