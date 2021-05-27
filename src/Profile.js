import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import Alert from './Alert';
import './Profile.css';

const Profile = () => {
  const user = useContext(UserContext);

  const profile = user.user;
  const update = user.update;

  const [inbound, setInbound] = useState(profile);
  const [alert, setAlert] = useState(null);

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
    e.preventDefault();
    const updated = await update(inbound);
    if (updated.success && alert === null) {
      setInbound((inbound) => inbound);
      setAlert({ type: 'success', message: ["It's updated!"] });
      return;
    } else {
      setAlert({ type: 'danger', message: updated.error });
      return;
    }
  }

  return (
    <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1>Profile</h1>
      {inbound ? (
        <div className="Profile card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  name="username"
                  placeholder={inbound.username}
                  value={inbound.username}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder={inbound.firstName}
                  name="firstName"
                  id="firstName"
                  value={inbound.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder={inbound.lastName}
                  name="lastName"
                  id="lastName"
                  value={inbound.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder={inbound.email}
                  name="email"
                  id="email"
                  value={inbound.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"
                  value={inbound.password}
                  onChange={handleChange}
                />
              </div>
              {alert ? (
                <button className="btn btn-primary btn-block mt-4" disabled>
                  Submit changes
                </button>
              ) : (
                <button className="btn btn-primary btn-block mt-4">
                  Submit changes
                </button>
              )}
            </form>
            {/* {msg ? <p>{msg}</p> : <p></p>} */}
            {alert ? (
              <Alert type={alert.type} message={alert.message} />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>
            <a href="/login">Login to see your profile</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
