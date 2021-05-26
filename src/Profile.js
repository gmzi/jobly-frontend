import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';

const Profile = () => {
  const history = useHistory();
  const user = useContext(UserContext);

  const profile = user.user;
  const update = user.update;

  const [inbound, setInbound] = useState(profile);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (profile && profile[2]) {
      const initialForm = {
        username: profile[2].username,
        firstName: profile[2].firstName,
        lastName: profile[2].lastName,
        email: profile[2].email,
        password: '',
      };
      setInbound(initialForm);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInbound((inbound) => ({
      ...inbound,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    console.log('button pressede');
    e.preventDefault();
    const updated = await update(inbound);
    if (updated.success && msg === null) {
      setInbound((inbound) => inbound);
      setMsg("It's updated!");
    }
  }

  return (
    <div>
      <h1>Update profile</h1>
      {inbound ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder={inbound.username}
              value={inbound.username}
              readOnly
            />

            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder={inbound.firstName}
              name="firstName"
              id="firstName"
              value={inbound.firstName}
              onChange={handleChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder={inbound.lastName}
              name="lastName"
              id="lastName"
              value={inbound.lastName}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder={inbound.email}
              name="email"
              id="email"
              value={inbound.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              value={inbound.password}
              onChange={handleChange}
            />
            {msg ? (
              <button disabled>Submit changes</button>
            ) : (
              <button>Submit changes</button>
            )}
          </form>
          <div>{msg ? <p>{msg}</p> : <p></p>}</div>
        </div>
      ) : (
        <p>
          <a href="/login">Login before profile</a>
        </p>
      )}
    </div>
  );
};

export default Profile;
