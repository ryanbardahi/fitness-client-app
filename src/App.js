import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Workouts from './components/Workouts';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* Root path now points to Login */}
        <Route path="/" element={<Login />} />
        {/* Explicitly defining /login for clarity and future scalability */}
        <Route path="/login" element={<Login />} />
        {/* Register route remains accessible via /register */}
        <Route path="/register" element={<Register />} />
        {/* Protected Workouts route */}
        <Route
          path="/workouts"
          element={
            <PrivateRoute>
              <Workouts />
            </PrivateRoute>
          }
        />
        {/* Optional: Catch-all route for undefined paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;