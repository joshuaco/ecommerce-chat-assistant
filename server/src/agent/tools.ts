import { Collection } from 'mongodb';
import { tool } from '@langchain/core/tools';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export async function itemLookupTool(query: string, collection: Collection) {
  // Create a custom tool for searching furniture inventory
  const customTool = tool(
    async ({ n = 10 }: { n: number }) => {
      try {
        console.log(`Item lookup tool called with query: ${query}`);

        const totalCount = await collection.countDocuments({});
        console.log(`Total number of items in collection: ${totalCount}`);

        if (totalCount === 0) {
          console.log('No items found in collection');
          return JSON.stringify({
            error: 'No items found in inventory',
            message: 'The inventory database appears to be empty',
            count: 0
          });
        }

        // Get sample documents for debugging purposes
        const sampleDocuments = await collection.find({}).limit(3).toArray();
        console.log('Sample documents:', sampleDocuments);

        // Configuration for MongoDB Atlas Vector Search
        const dbConfig = {
          collection: collection, // MongoDB collection to search
          indexName: 'vector_index', // Name of the vector search index
          textKey: 'embedding_text', // Field containing the text used for embeddings
          embeddingKey: 'embedding' // Field containing the vector embeddings
        };

        // Create vector store instance for semantic search using Google Gemini embeddings
        const vectorStore = new MongoDBAtlasVectorSearch(
          new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY, // Google API key from environment
            model: 'text-embedding-004' // Gemini embedding model
          }),
          dbConfig
        );

        console.log('Performing vector search...');
        const results = await vectorStore.similaritySearchWithScore(query, n);
        console.log(`Vector search returned ${results.length} results`);

        // If vector search returns no results, fall back to text search
        if (results.length === 0) {
          console.log('Vector search returned no results, trying text search...');
          // MongoDB text search using regular expressions
          const textResults = await collection
            .find({
              $or: [
                // OR condition - match any of these fields
                { item_name: { $regex: query, $options: 'i' } }, // Case-insensitive search in item name
                { item_description: { $regex: query, $options: 'i' } }, // Case-insensitive search in description
                { categories: { $regex: query, $options: 'i' } }, // Case-insensitive search in categories
                { embedding_text: { $regex: query, $options: 'i' } } // Case-insensitive search in embedding text
              ]
            })
            .limit(n)
            .toArray(); // Limit results and convert to array

          console.log(`Text search returned ${textResults.length} results`);
          // Return text search results as JSON string
          return JSON.stringify({
            results: textResults,
            searchType: 'text', // Indicate this was a text search
            query: query,
            count: textResults.length
          });
        }

        // Return vector search results as JSON string
        return JSON.stringify({
          results: results,
          searchType: 'vector', // Indicate this was a vector search
          query: query,
          count: results.length
        });
      } catch (error: any) {
        // Log detailed error information for debugging
        console.error('Error in item lookup:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });

        // Return error information as JSON string
        return JSON.stringify({
          error: 'Failed to search inventory',
          details: error.message,
          query: query
        });
      }
    },
    // Tool metadata
    {
      name: 'item_lookup',
      description: 'Gathers furniture item details from the inventory database'
    }
  );

  return [customTool];
}
