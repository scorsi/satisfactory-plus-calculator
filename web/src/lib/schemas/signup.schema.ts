import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string().min(5),
	email: z.string().email(),
	password: z.string().min(8),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
