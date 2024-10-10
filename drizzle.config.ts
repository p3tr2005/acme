import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	out: "./src/lib/migrations",
	schema: "./src/lib/schemas/index.ts",
	dbCredentials: {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
		ssl: {
			rejectUnauthorized: false,
		},
	},
	strict: true,
	verbose: true,
});
