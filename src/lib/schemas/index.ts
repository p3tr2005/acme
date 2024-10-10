import { sql } from "drizzle-orm";
import {
	int,
	timestamp,
	mysqlTable,
	primaryKey,
	varchar,
	char,
} from "drizzle-orm/mysql-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = mysqlTable("user", {
	id: char("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).unique(),
	emailVerified: timestamp("emailVerified", {
		mode: "date",
		fsp: 3,
	}),
	image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
	"account",
	{
		userId: varchar("userId", { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: varchar("type", { length: 255 })
			.$type<AdapterAccountType>()
			.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
		refresh_token: varchar("refresh_token", { length: 255 }),
		access_token: varchar("access_token", { length: 255 }),
		expires_at: int("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: varchar("id_token", { length: 2048 }),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
