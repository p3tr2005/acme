import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import SettingsForm from "./components/settings-form";
import { findStoreByIdAndByUserId } from "@/lib/repositories/store-repo";

type SettingsProps = {
  params: {
    storeId: string | undefined | null;
  };
};

const paramsSchema = z.object({
  storeId: z.string().uuid(),
});

const Settings = async ({ params }: SettingsProps) => {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  const { data, success } = paramsSchema.safeParse(params);

  if (!success) redirect("/");

  const store = await findStoreByIdAndByUserId(data.storeId, session.user.id);

  return (
    <main className="w-full">
      <SettingsForm storeId={data.storeId} initialData={store} />
    </main>
  );
};

export default Settings;
