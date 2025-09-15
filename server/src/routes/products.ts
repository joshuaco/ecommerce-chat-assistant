import { Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGO_DB_URI } from '../config/constants';

const router = Router();
const client = new MongoClient(MONGO_DB_URI as string);

router.get('/', async (_req, res) => {
  const products = await client
    .db('inventory_database')
    .collection('items')
    .find({})
    .toArray();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await client
    .db('inventory_database')
    .collection('items')
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(product);
});

export default router;
