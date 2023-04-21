import { z } from 'zod';

export const TeamSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  key: z.string()
});

export type Team = z.infer<typeof TeamSchema>;
