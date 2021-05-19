import React, { useState } from 'react';
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
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { username, password, firstName, lastName, email } = formData;
    signUp(formData);
    setFormData(initialState);
    history.push('/companies');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        placeholder="what's your firstName name?"
        name="firstName"
        id="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        placeholder="what's your lastName name?"
        name="lastName"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="what's your email?"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
