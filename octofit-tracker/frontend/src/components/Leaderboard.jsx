import { useEffect, useState } from 'react';
import { fetchApi } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('/api/leaderboard')
      .then((data) => setEntries(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || entry.id}>
                <td>{entry.user?.name || entry.user || 'Unknown'}</td>
                <td>{entry.team?.name || entry.team || 'Unknown'}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
