import { z } from "zod";

export const createUserSchema = z.object({
    signature: z.string(), 
    publicKey: z.string(), 
    address: z.string(), 
    message: z.string(),
});

export const createAgentSchema = z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
    website: z.string().optional(),
    twitter: z.string().optional(),
    telegram: z.string().optional(),
    x_username: z.string().optional(),
    x_password: z.string().optional(),
});

export const chatSchema = z.object({
    messages: z.array(z.string())
});