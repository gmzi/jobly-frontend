import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const initialState = {
    username: '',
    password: '',
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
    login(formData);
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
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
