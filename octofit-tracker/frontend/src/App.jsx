import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL } from './api.js';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">API base URL: <code>{API_BASE_URL}</code></p>
        </header>

        <nav className="nav nav-pills mb-4">
          <Link className="nav-link" to="/activities">Activities</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link" to="/teams">Teams</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/workouts">Workouts</Link>
        </nav>

        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Activities />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
