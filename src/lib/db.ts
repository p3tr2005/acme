import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "./env";
import * as schema from "@/lib/schemas";

const initDB = () => {
	const connection = mysql.createConnection({
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
	});

	connection.ping((err) => {
		if (err) {
			console.log("ERROR : Database connection failed");

			process.exit(1);
		}

		console.log("Database connected");
	});

	return connection;
};

export const db = drizzle(initDB(), {
	mode: "default",
	logger: true,
	schema,
});
