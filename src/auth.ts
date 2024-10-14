import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "./lib/env";
import { db } from "./lib/db";
import { accounts, users } from "./lib/schemas";
import { signInSchema } from "./lib/validations/auth";
import { findUserByEmail } from "./lib/repositories/user-repo";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
	}),
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { data: payload, success } = signInSchema.safeParse(credentials);

				if (!success) return null;

				const existingUser = await findUserByEmail(payload.email);

				if (!existingUser || !existingUser.password) return null;

				const isPasswordMatch = await compare(
					payload.password,
					existingUser.password,
				);

				if (!isPasswordMatch) return null;

				return existingUser;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				if (token.sub) {
					session.user.id = token.sub;
				}
			}
			return session;
		},
	},
	secret: env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "auth/sign-in",
		error: "/auth/error",
	},
});
