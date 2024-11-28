import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://fitnessapi-6hld.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access);
        notyf.success('Login successful!');
        navigate('/workouts');
      } else {
        notyf.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </>
  );
}

export default Login;