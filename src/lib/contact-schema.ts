import { z } from 'astro/zod';

export const contactFormSchema = z.object({
	name: z.string().trim().min(1, 'Name is required').max(300, 'Name cannot exceed 300 characters'),
	email: z.string().min(1, 'Email is required').email('Enter a valid email'),
	subject: z.string().min(1, 'Subject is required').max(50, 'Subject cannot exceed 50 characters'),
	message: z.string().min(1, 'Message is required').max(1000, 'Message cannot exceed 1000 characters'),
});

export type ContactFormFields = keyof typeof contactFormSchema.shape;
