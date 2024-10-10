import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "./env";
import * as schema from "@/lib/schemas";

const connection = mysql.createConnection({
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
});

export const db = drizzle(connection, {
	mode: "default",
	logger: true,
	schema,
});
