import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authApi';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      setUser(response.data);
      navigate('/protected');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <form className={styles["homepage-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;