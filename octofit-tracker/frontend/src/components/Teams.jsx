import { useEffect, useState } from 'react';
import { fetchApi } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('/api/teams')
      .then((data) => setTeams(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="row gy-3">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text"><small>{team.members?.length ?? 0} members</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
