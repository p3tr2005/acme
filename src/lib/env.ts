import { z } from "zod";

const envSchema = z.object({
	DB_USER: z.string().default("root"),
	DB_PASSWORD: z.string().default("root"),
	DB_HOST: z.string().default("localhost"),
	DB_PORT: z.coerce.number().default(3306),
	DB_NAME: z.string().default("acme"),

	AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
