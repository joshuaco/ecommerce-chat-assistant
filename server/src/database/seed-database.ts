import { GOOGLE_API_KEY } from '../config/constants';
import { connectToDB } from './config';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { createItemSummary } from './create-item-summary';
import { createVectorSearchIndex } from './create-vector-search-index';
import { generateSyntheticData } from './generate-synthetic-data';
import { setupDatabaseAndCollection } from './setup-database';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export async function seedDatabase() {
  console.log('Seeding database...');
  const client = await connectToDB();

  try {
    await setupDatabaseAndCollection(client);

    await createVectorSearchIndex(client);

    const db = client.db('inventory_database');
    const collection = db.collection('items');

    await collection.deleteMany({});
    console.log('Cleared existing data from items collection');

    // Generate new synthetic furniture data using AI
    const syntheticData = await generateSyntheticData();
    console.log(`Generated ${syntheticData.length} synthetic items`);

    // Process each item: create summary and prepare for vector storage
    const recordsWithSummaries = await Promise.all(
      syntheticData.map(async (record) => ({
        pageContent: await createItemSummary(record), // Create searchable summary
        metadata: { ...record } // Preserve original data
      }))
    );

    // Store each record with vector embeddings in MongoDB
    for (const record of recordsWithSummaries) {
      await MongoDBAtlasVectorSearch.fromDocuments(
        [record],
        new GoogleGenerativeAIEmbeddings({
          apiKey: GOOGLE_API_KEY,
          modelName: 'text-embedding-004'
        }),
        {
          collection,
          indexName: 'vector_index',
          textKey: 'embedding_text',
          embeddingKey: 'embedding'
        }
      );
      console.log('Successfully processed & saved record:', record.metadata.item_id);
    }

    console.log('Database and collection setup complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seedDatabase();
