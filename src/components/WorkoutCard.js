import React, { useState } from 'react';
import UpdateWorkoutModal from './UpdateWorkoutModal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function WorkoutCard({ workout, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const notyf = new Notyf();
  const token = localStorage.getItem('token');

  const formattedDate = new Date(workout.dateAdded).toLocaleDateString();

  const markAsComplete = async () => {
    setActionLoading(true);
    try {
      const response = await fetch(`https://fitnessapi-6hld.onrender.com/workouts/completeWorkoutStatus/${workout._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success('Workout marked as complete');
        onUpdate();
      } else {
        notyf.error(data.error || 'Failed to update workout status');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred while updating workout status');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteWorkout = async () => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;

    setActionLoading(true);
    try {
      const response = await fetch(`https://fitnessapi-6hld.onrender.com/workouts/deleteWorkout/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success('Workout deleted successfully');
        onUpdate();
      } else {
        notyf.error(data.error || 'Failed to delete workout');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred while deleting workout');
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {actionLoading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="workout-card">
        <h3>{workout.name}</h3>
        <p><strong>Duration:</strong> {workout.duration}</p>
        <p><strong>Date Added:</strong> {formattedDate}</p>
        <p><strong>Status:</strong> {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}</p>
        <div className="workout-card-buttons">
          {workout.status !== 'complete' && (
            <button
              className="mark-complete"
              onClick={markAsComplete}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Mark as Complete'
              )}
            </button>
          )}
          <button
            className="edit"
            onClick={openEditModal}
            disabled={actionLoading}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={deleteWorkout}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Delete'
            )}
          </button>
        </div>
        {isEditModalOpen && (
          <UpdateWorkoutModal
            workout={workout}
            onClose={closeEditModal}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </>
  );
}

export default WorkoutCard;