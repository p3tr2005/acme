import "server-only";
import { db } from "../db";
import { type InsertUser, users } from "../schemas";

export const findUserById = async (id: string) => {
	return db.query.users.findFirst({
		where: (fields, operator) => operator.eq(fields.id, id),
	});
};

export const findUserByEmail = async (email: string) => {
	return db.query.users.findFirst({
		where: (fields, operator) => operator.eq(fields.email, email),
	});
};

export const insertUser = async (user: InsertUser) => {
	return await db.insert(users).values(user);
};
