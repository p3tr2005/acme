import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { findStoreByUserId } from "@/lib/repositories/store-repo";
import type { Children } from "@/types";

const RootLayout = async ({ children }: Children) => {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  const store = await findStoreByUserId(session.user.id);

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default RootLayout;
