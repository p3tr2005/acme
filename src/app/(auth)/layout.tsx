import "@/ui/styles/main.css";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DEFAULT_AUTH_REDIRECT } from "@/lib/constants";
import type { Children } from "@/types";

const AuthLayout = async ({ children }: Children) => {
	const session = await auth();

	if (session) redirect(DEFAULT_AUTH_REDIRECT);

	return <>{children}</>;
};

export default AuthLayout;
