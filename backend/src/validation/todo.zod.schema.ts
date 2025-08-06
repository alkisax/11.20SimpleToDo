import { z } from 'zod';

export const todoZodSchema = z.object({
  username: z.string().optional(),
  todo: z.string().min(1, 'Todo cannot be empty'),
});