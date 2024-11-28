// src/components/Workouts.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from './WorkoutCard';
import AddWorkoutModal from './AddWorkoutModal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import SpinnerOverlay from './SpinnerOverlay';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fitnessapi-6hld.onrender.com/workouts/getMyWorkouts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setWorkouts(data.workouts);
      } else {
        notyf.error(data.error || 'Failed to fetch workouts');
      }
    } catch (error) {
      console.error('Error:', error);
      notyf.error('An error occurred while fetching workouts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <>
      {loading && <SpinnerOverlay />}
      <div className="workouts-container">
        <h2>Your Workouts</h2>
        <div className="workouts-header">
          <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
            Add Workout
          </button>
        </div>
        {showAddModal && <AddWorkoutModal onClose={() => setShowAddModal(false)} onAdd={fetchWorkouts} />}
        <div className="workouts-list">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} onUpdate={fetchWorkouts} />
            ))
          ) : (
            <p className="text-center">No workouts found. Add some!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Workouts;