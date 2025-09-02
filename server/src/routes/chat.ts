import { MONGO_DB_URI } from '../config/constants';
import { Router } from 'express';
import { MongoClient } from 'mongodb';
import { callAgent } from '../handlers/agent';

const router = Router();
const client = new MongoClient(MONGO_DB_URI as string);

router.post('/', async (req, res) => {
  const initialMessage = req.body.message;
  const sessionID = Date.now().toString();

  try {
    const response = await callAgent(client, initialMessage, sessionID);
    res.json({ sessionID, response });
  } catch (error) {
    console.error('Error initializing chat session', error);
    res.status(500).json({ error: 'Failed to initialize chat session' });
  }
});

router.post('/:sessionId', async (req, res) => {
  const sessionID = req.params.sessionId;
  const message = req.body.message;

  console.log({ sessionID, message });

  try {
    const response = await callAgent(client, message, sessionID);
    res.json({ response });
  } catch (error) {
    console.error('Error sending message to agent', error);
    res.status(500).json({ error: 'Failed to send message to agent' });
  }
});

export default router;
