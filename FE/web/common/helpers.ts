import { z } from 'zod';

export const isValidValue = (schema: z.ZodSchema, value: unknown) => {
  const result = schema.safeParse(value);

  if (result.success) {
    return null;
  }

  if (result.error instanceof z.ZodError) {
    return result.error.issues[0].message;
  }
};
