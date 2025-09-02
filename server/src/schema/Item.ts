import { z } from 'zod';
import { OutputParserException } from '@langchain/core/output_parsers';

export const ItemSchema = z.object({
  item_id: z.string(), // Unique identifier for the item
  item_name: z.string(), // Name of the furniture item
  item_description: z.string(), // Detailed description of the item
  brand: z.string(), // Brand/manufacturer name
  manufacturer_address: z.object({
    // Nested object for manufacturer location
    street: z.string(), // Street address
    city: z.string(), // City name
    state: z.string(), // State/province
    postal_code: z.string(), // ZIP/postal code
    country: z.string() // Country name
  }),
  prices: z.object({
    // Nested object for pricing information
    full_price: z.number(), // Regular price
    sale_price: z.number() // Discounted price
  }),
  categories: z.array(z.string()), // Array of category tags
  user_reviews: z.array(
    // Array of customer reviews
    z.object({
      review_date: z.string(), // Date of review
      rating: z.number(), // Numerical rating (1-5)
      comment: z.string() // Review text comment
    })
  ),
  notes: z.string() // Additional notes about the item
});

export type Item = z.infer<typeof ItemSchema>;

// Schema for array of items
export const ItemsArraySchema = z.array(ItemSchema);
export type Items = z.infer<typeof ItemsArraySchema>;

// Create parser that ensures AI output matches our items array schema
export const itemsParser = {
  parse: (text: string): Items => {
    try {
      // Clean the text by removing markdown code blocks if present
      let cleanedText = text.trim();

      // Remove ```json and ``` if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.slice(7); // Remove '```json'
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.slice(3); // Remove '```'
      }

      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(0, -3); // Remove ending '```'
      }

      cleanedText = cleanedText.trim();

      const parsed = JSON.parse(cleanedText);

      // Ensure we always return an array
      if (Array.isArray(parsed)) {
        return ItemsArraySchema.parse(parsed);
      } else {
        // If single item, wrap in array
        return ItemsArraySchema.parse([parsed]);
      }
    } catch (error) {
      throw new OutputParserException(`Failed to parse output: ${error}`);
    }
  },
  getFormatInstructions: (): string => {
    return `Respond with a valid JSON array of objects that matches this schema. Each object should follow the Item schema:
${JSON.stringify(ItemSchema.shape, null, 2)}

Example format:
[
  {
    "item_id": "...",
    "item_name": "...",
    "item_description": "...",
    "brand": "...",
    "manufacturer_address": {
      "street": "...",
      "city": "...",
      "state": "...",
      "postal_code": "...",
      "country": "..."
    },
    "prices": {
      "full_price": 0,
      "sale_price": 0
    },
    "categories": ["..."],
    "user_reviews": [
      {
        "review_date": "...",
        "rating": 0,
        "comment": "..."
      }
    ],
    "notes": "..."
  }
]

IMPORTANT: Respond only with valid JSON, no markdown formatting or code blocks.`;
  }
};
