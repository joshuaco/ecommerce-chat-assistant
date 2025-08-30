import { config } from 'dotenv';

config();

export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
