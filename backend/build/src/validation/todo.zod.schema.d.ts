import { z } from 'zod';
export declare const todoZodSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    todo: z.ZodString;
}, z.core.$strip>;
