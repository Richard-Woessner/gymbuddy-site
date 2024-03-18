import React, { useState } from 'react';
import Styles from './SignUp.module.scss';
import { useAuth } from '../../../providers/AuthProvider';

const SignUp: React.FC = () => {
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth.createUser(email, password, '');
  };

  return (
    <div className={Styles.signupContainer}>
      <h1>Sign Up</h1>
      <form>
        <div className={Styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={Styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
