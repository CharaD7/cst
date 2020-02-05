import React, { useState } from 'react';
import { login } from './auth';

const SignIn = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [userType, setUserType] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(state, userType, setUserType, setLoginError, history);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{loginError}</p>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
