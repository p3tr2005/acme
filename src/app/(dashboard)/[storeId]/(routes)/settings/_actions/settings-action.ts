"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
	deleteStoreByIdAndByUserId,
	updateStoreByIdAndByUserId,
} from "@/lib/repositories/store-repo";
import { Store } from "@/lib/schemas";
import { settingsFormSchema } from "@/lib/validations/settings";

export const updateStoreAction = async (
	storeId: string,
	store: Partial<Store>,
) => {
	const session = await auth();

	if (!session)
		return {
			error: "Unauthorized",
		};

	const { data, success } = settingsFormSchema.safeParse(store);

	if (!success)
		return {
			error: "Invalid data",
		};

	try {
		await updateStoreByIdAndByUserId(storeId, session.user.id, {
			name: data.name,
		});
	} catch (err) {
		console.log("SETTINGS_ACTION:", err);

		return {
			error: "Something went wrong",
		};
	}
};

export const deleteStoreByIdAction = async (storeId: string) => {
	const session = await auth();

	if (!session)
		return {
			error: "Unauthorized",
		};

	try {
		await deleteStoreByIdAndByUserId(storeId, session.user.id);
	} catch (err) {
		console.log("SETTINGS_DELETE_ACTION:", err);

		return {
			error: "Something went wrong",
		};
	}
};
