import { z } from 'zod';

export const InputValidationSchema = z.object({
  query: z.string().describe('The search query'),
  n: z.number().optional().default(10).describe('The number of results to return')
});
