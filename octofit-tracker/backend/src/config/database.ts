import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(uri, {
    dbName: 'octofit_db',
    keepAlive: true,
    connectTimeoutMS: 10000
  });
}
