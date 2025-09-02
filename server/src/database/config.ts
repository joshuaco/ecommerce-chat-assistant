import { MongoClient } from 'mongodb';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GOOGLE_API_KEY, MONGO_DB_URI } from '../config/constants';

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

// Initialize Google Gemini chat model for generating synthetic furniture data
export const geminiChatModel = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  temperature: 0.7, // Set creativity level (0.7 = moderately creative)
  apiKey: GOOGLE_API_KEY
});
