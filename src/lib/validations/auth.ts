import { z } from "zod";

export const signUpSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" }),
});

export const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignUpPayload = z.infer<typeof signUpSchema>;
export type SignInPayload = z.infer<typeof signInSchema>;
