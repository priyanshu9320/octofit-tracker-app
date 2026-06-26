import { useEffect, useState } from 'react';
import { fetchApi } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('/api/activities')
      .then((data) => setActivities(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {activities.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="list-group-item">
              <h5>{activity.type}</h5>
              <p>{activity.duration} min · {activity.calories} cal</p>
              <small>{activity.date ? new Date(activity.date).toLocaleString() : 'No date'}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
