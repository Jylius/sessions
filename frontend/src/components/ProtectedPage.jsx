import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

function ProtectedPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className={styles["homepage-form"]}>
      <h2>Welcome, {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProtectedPage;