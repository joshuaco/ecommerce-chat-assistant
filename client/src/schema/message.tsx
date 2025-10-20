import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['user', 'assistant']),
  timestamp: z.date()
});

export type Message = z.infer<typeof MessageSchema>;
