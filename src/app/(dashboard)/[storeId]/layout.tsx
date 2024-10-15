import { z } from "zod";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { findStoreByIdAndByUserId } from "@/lib/repositories/store-repo";
import type { Children } from "@/types";
import Navbar from "./components/navbar";

type LayoutProps = {
  params: {
    storeId: string | undefined | null;
  };
} & Children;

const paramsSchema = z.object({
  storeId: z.string().uuid(),
});

const DashboardLayout = async ({ children, params }: LayoutProps) => {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  const { data, success } = paramsSchema.safeParse(params);

  if (!success) redirect("/");

  const found = await findStoreByIdAndByUserId(data.storeId, session.user.id);
  if (!found) redirect("/");

  return (
    <>
      <Navbar storeId={data.storeId} user={session.user} />
      {children}
    </>
  );
};

export default DashboardLayout;
