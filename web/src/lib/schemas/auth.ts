import { z } from "zod";

export const userSchema = z.object({
	id: z.string().cuid2(),
	email: z.string().email(),
	username: z.string().min(3).max(255),
	password: z.string().min(8).max(255),
	createdAt: z.date().refine((d) => d <= new Date(), {
		message: "createdAt must be in the past",
	}),
	updatedAt: z.date().refine((d) => d <= new Date(), {
		message: "updatedAt must be in the past",
	}),
});

export type User = z.infer<typeof userSchema>;
