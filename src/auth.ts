import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "./lib/env";
import { db } from "./lib/db";
import { accounts, users } from "./lib/schemas";

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
				return null;
			},
		}),
	],
	secret: env.AUTH_SECRET,
	pages: {
		signIn: "/sign-in",
		error: "/auth/error",
		newUser: DEFAULT_AUTH_REDIRECT,
	},
});
