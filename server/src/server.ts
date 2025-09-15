import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat';
import productsRoutes from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRoutes);
app.use('/api/products', productsRoutes);

app.get('/', (_req, res) => {
  // Send simple response to confirm server is running
  res.send('LangGraph Agent Server');
});

export default app;
