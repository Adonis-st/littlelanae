import z from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email().min(2),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormInput = z.TypeOf<typeof loginFormSchema>;
