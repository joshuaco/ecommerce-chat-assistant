import { MongoClient } from 'mongodb';
import { VECTOR_SEARCH_INDEX } from './constants';

export async function createVectorSearchIndex(client: MongoClient) {
  try {
    const db = client.db('inventory_database');
    const collection = db.collection('items');

    await collection.dropIndexes();

    console.log('Creating vector search index...');

    await collection.createSearchIndex(VECTOR_SEARCH_INDEX);

    console.log('Vector search index created successfully');
  } catch (error) {
    console.error('Error creating vector search index', error);
  }
}
