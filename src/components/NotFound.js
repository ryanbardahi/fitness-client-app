import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="auth-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/login" className="btn btn-primary">Go to Login</Link>
    </div>
  );
}

export default NotFound;