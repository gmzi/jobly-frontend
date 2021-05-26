import React, { useState, useEffect } from 'react';
import JoblyApi from './apiHelper';
import Nav from './Nav';
import Routes from './Routes';
import { UserContext } from './UserContext';
import { BrowserRouter } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [prevApps, setPrevApps] = useState();

  const userProviderValue = {
    user,
    setUser,
    update,
    applyFront,
    prevApps,
    setPrevApps,
  };

  useEffect(
    async function () {
      console.log(token);

      const local = window.localStorage.getItem('currUser');
      const currUsr = JSON.parse(local);
      if (currUsr) {
        try {
          const userData = await JoblyApi.getUser(currUsr[1], currUsr[0]);
          setPrevApps((prevApps) => userData.applications);
          const nextUser = [...currUsr, userData];
          setUser(nextUser);
        } catch (e) {
          console.log('Loading problem', e);
          setUser((user) => null);
        }
      }
    },
    [token]
  );

  function updateLocalStorage(obj) {
    window.localStorage.setItem('currUser', JSON.stringify(obj));
  }

  async function signUp(userData) {
    try {
      const newToken = await JoblyApi.register(userData);
      const newUser = [[newToken], [userData.username]];
      setToken(newToken);
      updateLocalStorage(newUser);
      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false, error: e };
    }
  }

  async function login(userData) {
    try {
      const newToken = await JoblyApi.login(userData);
      const newUser = [[newToken], [userData.username]];
      setToken(newToken);
      updateLocalStorage(newUser);
      return { success: true };
    } catch (e) {
      console.log('login failed', e);
      return { success: false, error: e };
    }
  }

  async function update(form) {
    try {
      delete form.username;
      debugger;
      const updatedData = await JoblyApi.update(user[1][0], form);
      setUser((user) => (user[2] = updatedData));
      return { success: true };
    } catch (e) {
      console.log('update failed', e);
      return { success: false, error: e };
    }
  }

  function logout() {
    window.localStorage.removeItem('currUser');
    JoblyApi.logout();
    setUser((user) => null);
    setToken((token) => null);
    setPrevApps((prevApps) => null);
  }

  async function applyFront(jobId, username) {
    try {
      const result = await applyBack(username, jobId);
      setPrevApps((prevApps) => [...prevApps, result.applied]);
      return { success: true };
    } catch (e) {
      console.log('application failed', e);
      return { success: false, error: e };
    }
  }

  async function applyBack(username, jobId) {
    try {
      const req = await JoblyApi.dbApply(username, jobId);
      setUser((user) => user);
      return req;
    } catch (e) {
      console.log('application failed on db', e);
      return { success: false, error: e };
    }
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
