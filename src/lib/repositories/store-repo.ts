import "server-only";
import { db } from "@/lib/db";
import { type InsertStore, stores } from "@/lib/schemas";
import { and, eq } from "drizzle-orm";

export const findStoreByUserId = async (userId: string) => {
	const store = await db.query.stores.findFirst({
		where: (fields, operator) => operator.eq(fields.userId, userId),
	});

	return store;
};

export const findStoreByIdAndByUserId = async (id: string, userId: string) => {
	const store = await db
		.select()
		.from(stores)
		.where(and(eq(stores.id, id), eq(stores.userId, userId)));

	return store[0];
};

export const findStoresByIdAndByUserId = async (id: string, userId: string) => {
	const store = await db
		.select()
		.from(stores)
		.where(and(eq(stores.id, id), eq(stores.userId, userId)));

	return store;
};

export const insertStore = async (store: InsertStore) => {
	return await db.insert(stores).values(store);
};
