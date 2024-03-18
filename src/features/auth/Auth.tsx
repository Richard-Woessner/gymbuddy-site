import React, { useState } from 'react';

import Styles from './Auth.module.scss';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here

    console.log('Email:', email);
    console.log('Password:', password);

    const u = await auth.login(email, password);

    if (u) {
      navigate('/');
    }
  };

  return (
    <div className={Styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
