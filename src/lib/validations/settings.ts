import { z } from "zod";

export const settingsFormSchema = z.object({
	name: z.string().min(1),
});
