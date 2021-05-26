import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);

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
    const logged = await login(formData);
    if (logged.success) {
      setFormData(initialState);
      history.push('/companies');
    } else {
      setErrorMsg(logged.error);
    }
  }

  return (
    <div>
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
      <div>{errorMsg ? <p>{errorMsg}</p> : <p></p>}</div>
      <div>
        <p>
          Not a member? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
