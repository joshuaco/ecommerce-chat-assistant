import { itemsParser } from '../schema/Item';

export const VECTOR_SEARCH_INDEX = {
  name: 'vector_index',
  type: 'vectorSearch',
  definition: {
    fields: [
      {
        type: 'vector',
        path: 'embedding',
        numDimensions: 768,
        similarity: 'cosine'
      }
    ]
  }
} as const;

// Create detailed prompt instructing AI to generate furniture store data
export const generateItemsPrompt = `You are a helpful assistant that generates furniture store item data. Generate 10 furniture store items. Each record should include the following fields: item_id, item_name, item_description, brand, manufacturer_address, prices, categories, user_reviews, notes. Ensure variety in the data and realistic values. ${itemsParser.getFormatInstructions()}`;
