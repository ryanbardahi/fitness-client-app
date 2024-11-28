import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Modal from './Modal';

function UpdateWorkoutModal({ workout, onClose, onUpdate }) {
  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(workout.duration);
  const [status, setStatus] = useState(workout.status);
  const [loading, setLoading] = useState(false);
  const notyf = new Notyf();

  const handleUpdateWorkout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://fitnessapi-6hld.onrender.com/workouts/updateWorkout/${workout._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, duration, status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        notyf.success('Workout updated successfully');
        onUpdate(); // Refresh the workouts list
        onClose();  // Close the modal
      } else {
        notyf.error(data.error || 'Failed to update workout');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred while updating the workout');
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
      <h2>Edit Workout</h2>
      <form onSubmit={handleUpdateWorkout}>
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
            placeholder="e.g., 45 minutes"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Workout
        </button>
        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default UpdateWorkoutModal;