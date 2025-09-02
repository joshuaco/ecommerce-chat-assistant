import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat';
import { connectToDB } from './database/config';

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRoutes);

app.get('/', (_req, res) => {
  // Send simple response to confirm server is running
  res.send('LangGraph Agent Server');
});

export default app;
