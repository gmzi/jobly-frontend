import React, { useState } from 'react';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const initialState = {
    username: '',
    password: '',
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
    const logged = await login(formData);
    if (logged.success) {
      setFormData(initialState);
      history.push('/companies');
    } else {
      setAlert({ type: 'danger', message: logged.error });
    }
  }

  return (
    <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="Login card">
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
            <button className="btn btn-primary btn-block mt-4">Login</button>
          </form>
          <div>
            {alert ? (
              <Alert type={alert.type} message={alert.message} />
            ) : (
              <p></p>
            )}
          </div>
          <div>
            <p>
              Not a member? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
