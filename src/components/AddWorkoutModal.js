import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Modal from './Modal';

function AddWorkoutModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const notyf = new Notyf();

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fitnessapi-6hld.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, duration }),
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success('Workout added successfully');
        onAdd();
        onClose();
      } else {
        notyf.error(data.error || 'Failed to add workout');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred while adding workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h2>Add Workout</h2>
      <form onSubmit={handleAddWorkout}>
        <div className="mb-3">
          <label htmlFor="workoutName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="workoutName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter workout name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="text"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            placeholder="e.g., 30 minutes"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Workout
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default AddWorkoutModal;
