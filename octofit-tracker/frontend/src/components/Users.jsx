import { useEffect, useState } from 'react';
import { fetchApi } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('/api/users')
      .then((data) => setUsers(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.id} className="list-group-item">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
              <small>{user.role} · {user.team?.name || 'No team'}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
