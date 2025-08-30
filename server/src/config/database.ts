import { MongoClient } from 'mongodb';
import { MONGO_DB_URI } from './constants';

export async function connectToDB() {
  const client = new MongoClient(MONGO_DB_URI as string);
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Successfully connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}
