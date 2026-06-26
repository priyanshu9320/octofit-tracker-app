import { useEffect, useState } from 'react';
import { fetchApi } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('/api/workouts')
      .then((data) => setWorkouts(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {workouts.length === 0 ? (
        <p>No workout plans available.</p>
      ) : (
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="list-group-item">
              <h5>{workout.title}</h5>
              <p>{workout.description}</p>
              <small>{workout.duration} min · {workout.intensity}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
