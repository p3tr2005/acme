'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Heading from "./heading";
import type { Store } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/components/form";
import { Input } from "@/ui/components/input";
import ButtonFallback from "@/ui/components/button-fallback";
import { updateStoreAction } from "../_actions/settings-action";
import { settingsFormSchema } from "@/lib/validations/settings";
import DeleteStoreModal from "./delete-modal";
import ApiAlert from "@/ui/components/api-alert";

import { useOrigin } from "@/lib/hooks/use-origin";

type Props = {
  initialData: Store
  storeId: string
}

const SettingsForm = ({ initialData, storeId }: Props) => {
  const form = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: initialData.name
    }
  })
  const origin = useOrigin()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    const err = await updateStoreAction(storeId, values);

    if (!err) {
      toast.success("Settings updated");

      router.refresh()

      return
    }

    toast.error(err.error)
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="w-full flex items-center justify-between border-b border-zinc-200 p-8">
        <Heading title="Settings" description="Manage store preferences" />

        <DeleteStoreModal storeId={storeId} />
      </div>

      <Form {...form}>
        <form className="w-max space-y-3 px-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonFallback type="submit" className="w-full" loading={form.formState.isSubmitting} disabled={form.formState.isSubmitting}>Save Changes</ButtonFallback>
        </form>
      </Form>

      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${storeId}`} variant="public" />
    </div>
  );
};

export default SettingsForm;
