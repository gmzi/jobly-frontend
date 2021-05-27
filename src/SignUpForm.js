import React, { useState } from 'react';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';

const SignUpForm = ({ signUp }) => {
  const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const signedUp = await signUp(formData);
    if (signedUp.success) {
      setFormData(initialState);
      history.push('/companies');
    } else {
      setAlert({ type: 'danger', message: signedUp.error });
    }
  }

  return (
    <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="SignUp card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="what's your firstName name?"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="what's your lastName name?"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="what's your email?"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary btn-block mt-4">Sign Up</button>
          </form>
          <div>
            <p>
              Already a member? <a href="/login">login</a>
            </p>
          </div>
          <div>
            {alert ? (
              <Alert type={alert.type} message={alert.message} />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
