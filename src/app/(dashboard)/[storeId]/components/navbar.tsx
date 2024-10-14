import type { Session } from "next-auth";

import Profile from "@/ui/components/profile";
import NavRoutes from "./routes";
import { StoreSwitcher } from "./store-switcher";
import { findStoresByUserId } from "@/lib/repositories/store-repo";
import type { Store } from "@/lib/schemas";

type Props = {
	user: NonNullable<Session["user"]>;
	storeId: string;
};

const Navbar = async ({ user }: Props) => {
	const stores = await findStoresByUserId(user.id);

	const storeDTO = StoreDTO(stores);

	return (
		<nav className="w-full flex items-center justify-between p-3 px-8 border-b">
			<div className="flex items-center gap-6">
				<StoreSwitcher stores={storeDTO} />
				<NavRoutes />
			</div>

			<Profile
				src={user.image as string}
				alt={user.name as string}
				href="/profile"
				fallback={user.name as string}
			/>
		</nav>
	);
};

const StoreDTO = (stores: Store[]): { label: string; value: string }[] => {
	return stores.map((store) => ({
		label: store.name,
		value: store.id,
	}));
};

export default Navbar;
