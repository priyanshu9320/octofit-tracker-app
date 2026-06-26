import { connectDatabase } from '../config/database';
import mongoose from 'mongoose';

async function seed() {
  await connectDatabase();
  console.log('Connected to MongoDB and ready to seed octofit_db');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
