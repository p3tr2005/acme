"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModalStore } from "@/lib/stores/modal-store";

import Modal from "@/ui/components/modal";
import ButtonFallback from "@/ui/components/button-fallback";
import { Input } from "@/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";
import { createStoreAction } from "@/app/_actions/create-store-action";
import { toast } from "sonner";

const storeSchema = z.object({
  name: z.string({ required_error: "Store name is required" }).min(1),
});

const ModalProvider = () => {
  const modalStore = useModalStore();
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onModalChange = (open: boolean) => {
    if (open) {
      modalStore.onClose();
      return;
    }
  };

  const onSubmit = async (data: z.infer<typeof storeSchema>) => {
    const res = await createStoreAction(data.name);

    if (res.storeId) {
      toast.success("Store created successfully");
      window.location.assign(`/${res.storeId}`);
      return;
    }

    toast.error(res.error);
  };

  return (
    <Modal
      title="Create new store"
      description="Create new store here to start selling"
      isOpen={modalStore.isOpen}
      onOpenChange={onModalChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    className="bg-background"
                    placeholder="store name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center gap-3">
            <ButtonFallback
              disabled={form.formState.isSubmitting}
              onClick={modalStore.onClose}
              className="w-full font-bold border-[2px] border-zinc-500"
              variant="outline"
              size="lg"
            >
              cancel
            </ButtonFallback>

            <ButtonFallback
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              className="w-full font-bold"
              type="submit"
              size="lg"
            >
              submit
            </ButtonFallback>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ModalProvider;
