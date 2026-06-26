import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  intensity: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
