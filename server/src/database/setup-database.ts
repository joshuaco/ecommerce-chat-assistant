import { MongoClient } from 'mongodb';

export async function setupDatabaseAndCollection(client: MongoClient) {
  console.log('Setting up database and collection...');

  const db = client.db('inventory_database');
  const collections = await db.listCollections({ name: 'items' }).toArray();

  if (collections.length === 0) {
    await db.createCollection('items');
    console.log("Created 'items' collection in 'inventory_database' database");
  } else {
    console.log(
      "'items' collection already exists in 'inventory_database' database"
    );
  }
}
