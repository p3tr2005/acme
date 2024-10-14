import type { ReactNode } from "react";
import NextAuth, { type DefaultSession } from "next-auth";

type Children = {
	children: ReactNode;
};

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}
