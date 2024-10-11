"use server";

import { signIn } from "@/auth";
import { DEFAULT_AUTH_REDIRECT } from "@/lib/constants";
import { findUserByEmail } from "@/lib/repositories/user-repo";
import { signInSchema, type SignInPayload } from "@/lib/validations/auth";
import { compare } from "bcryptjs";

export const signInAction = async (values: SignInPayload) => {
	const { data: payload, success } = signInSchema.safeParse(values);

	if (!success)
		return {
			error: "Validation error",
		};

	const existingUser = await findUserByEmail(payload.email);

	if (!existingUser || !existingUser.password)
		return {
			error: "Invalid credentials",
		};

	const isPasswordMatch = await compare(
		payload.password,
		existingUser.password,
	);

	if (!isPasswordMatch)
		return {
			error: "Invalid credentials",
		};

	await signIn("credentials", {
		email: payload.email,
		password: payload.password,
		redirectTo: DEFAULT_AUTH_REDIRECT,
	});
};
