import { z } from "zod";

export const signinSchema = z.object({
	username: z.string().min(5),
	password: z.string().min(8),
});

export type SigninSchema = z.infer<typeof signinSchema>;
