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

export const findStoresByUserId = async (userId: string) => {
	const stores = await db.query.stores.findMany({
		where: (fields, operator) => operator.eq(fields.userId, userId),
	});

	return stores;
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

export const updateStoreByIdAndByUserId = async (
	id: string,
	userId: string,
	store: Partial<InsertStore>,
) => {
	return await db
		.update(stores)
		.set(store)
		.where(and(eq(stores.id, id), eq(stores.userId, userId)));
};

export const deleteStoreByIdAndByUserId = async (
	id: string,
	userId: string,
) => {
	return await db
		.delete(stores)
		.where(and(eq(stores.id, id), eq(stores.userId, userId)));
};
