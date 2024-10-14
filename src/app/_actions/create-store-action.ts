"use server";

import { auth } from "@/auth";
import { findStoreByUserId, insertStore } from "@/lib/repositories/store-repo";

export const createStoreAction = async (payload: string) => {
	try {
		const session = await auth();

		if (!session || !session.user || !session.user.id) {
			return {
				error: "Unauthorized user!",
			};
		}

		await insertStore({
			name: payload,
			userId: session.user.id,
		});

		const store = await findStoreByUserId(session.user.id);

		if (!store)
			return {
				error: "Something went wrong",
			};

		return {
			storeId: store.id,
		};
	} catch (e) {
		return {
			error: "Something went wrong",
		};
	}
};
