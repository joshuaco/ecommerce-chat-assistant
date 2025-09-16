import { z } from 'zod';

export const ItemSchema = z.object({
  item_id: z.string(),
  item_name: z.string(),
  item_description: z.string(),
  brand: z.string(),
  manufacturer_address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string()
  }),
  prices: z.object({
    full_price: z.number(), // Regular price
    sale_price: z.number()
  }),
  categories: z.array(z.string()),
  user_reviews: z.array(
    z.object({
      review_date: z.string(),
      rating: z.number(),
      comment: z.string()
    })
  ),
  notes: z.string()
});

export const ItemsArraySchema = z.array(ItemSchema);

export type Item = z.infer<typeof ItemSchema>;
export type Items = z.infer<typeof ItemsArraySchema>;
