import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

// TO FIX: user not found upon re-render of component.

const Profile = () => {
  let user = useContext(UserContext);

  const profile = user.user;
  const update = user.update;

  const [inbound, setInbound] = useState(profile);

  useEffect(() => {
    // filter the weird renders in which the context is null
    if (profile) {
      const initialForm = {
        username: profile[2].username,
        firstName: profile[2].firstName,
        lastName: profile[2].lastName,
        email: profile[2].email,
        password: '',
      };
      setInbound((inbound) => initialForm);
    }
  }, [setInbound]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInbound((inbound) => ({
      ...inbound,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = update(inbound);
    setInbound((inbound) => inbound);
    alert('Profile updated!');
  };

  return (
    <div>
      <h1>Hi</h1>
      {inbound ? (
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

          <label htmlFor="password">Enter password to apply changes</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={inbound.password}
            onChange={handleChange}
          />
          <button>Submit changes</button>
        </form>
      ) : (
        <p>
          <a href="/login">Login before profile</a>
        </p>
      )}
    </div>
  );
};

export default Profile;
