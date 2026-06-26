// Seed the octofit_db database with test data.
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

async function seed() {
  await connectDatabase();
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Mergington Movers', description: 'Student fitness crew focused on daily activity', members: [] },
    { name: 'Healthy Hustle', description: 'Teachers and coaches promoting balanced workouts', members: [] }
  ]);

  const users = await User.create([
    { name: 'Paul Octo', email: 'paul@mergington.edu', role: 'coach', team: teams[0]._id, points: 550 },
    { name: 'Jessica Cat', email: 'jessica@mergington.edu', role: 'student', team: teams[0]._id, points: 420 },
    { name: 'Avery Lane', email: 'avery@mergington.edu', role: 'student', team: teams[1]._id, points: 380 }
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all(teams.map((team) => team.save()));

  const workouts = await Workout.create([
    { title: 'Morning Run', description: 'A quick 20-minute interval run', duration: 20, intensity: 'medium', category: 'cardio' },
    { title: 'Strength Circuit', description: 'Full-body strength training with bodyweight exercises', duration: 35, intensity: 'high', category: 'strength' },
    { title: 'Recovery Walk', description: 'Gentle walking to cool down and recover', duration: 25, intensity: 'low', category: 'recovery' }
  ]);

  const activities = await Activity.create([
    { user: users[0]._id, team: teams[0]._id, type: 'running', duration: 22, calories: 260, date: new Date(), workout: workouts[0]._id },
    { user: users[1]._id, team: teams[0]._id, type: 'strength', duration: 35, calories: 340, date: new Date(), workout: workouts[1]._id },
    { user: users[2]._id, team: teams[1]._id, type: 'walking', duration: 25, calories: 120, date: new Date(), workout: workouts[2]._id }
  ]);

  const leaderboardEntries = await LeaderboardEntry.create([
    { user: users[0]._id, team: teams[0]._id, score: 550, category: 'individual' },
    { user: users[1]._id, team: teams[0]._id, score: 420, category: 'individual' },
    { user: users[2]._id, team: teams[1]._id, score: 380, category: 'individual' }
  ]);

  console.log('Seeded octofit_db database with test data');
  console.log(`Created ${users.length} users, ${teams.length} teams, ${workouts.length} workouts, ${activities.length} activities, and ${leaderboardEntries.length} leaderboard entries.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
