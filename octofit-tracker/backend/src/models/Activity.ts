import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
