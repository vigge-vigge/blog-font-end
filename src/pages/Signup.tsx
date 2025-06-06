import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../pages/styles/Auth.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(username, password);
      login(response.token, response.user);
      navigate('/login');
    } catch (err: any) {
      let msg = 'Signup failed';
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      setError(msg);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
