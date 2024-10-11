"use server";

import { findUserByEmail, insertUser } from "@/lib/repositories/user-repo";
import { type SignUpPayload, signUpSchema } from "@/lib/validations/auth";
import { hash } from "bcryptjs";

export const signUpAction = async (values: SignUpPayload) => {
	const { data: payload, success } = signUpSchema.safeParse(values);

	if (!success)
		return {
			error: "Validation error",
		};

	try {
		const existingUser = await findUserByEmail(payload.email);

		if (existingUser)
			return {
				error: "Invalid credentials",
			};

		const hashedPassword = await hash(payload.password, 10);

		await insertUser({
			name: payload.username,
			email: payload.email,
			password: hashedPassword,
		});
	} catch (e) {
		return {
			error: "Something went wrong",
		};
	}
};
