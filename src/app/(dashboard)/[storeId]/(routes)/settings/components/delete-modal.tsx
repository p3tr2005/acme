'use client'

import { useState, useTransition } from "react"

import { toast } from "sonner"
import { Trash } from "lucide-react"

import { Button } from "@/ui/components/button"
import ButtonFallback from "@/ui/components/button-fallback"

import { deleteStoreByIdAction } from "../_actions/settings-action"
import { useRouter } from "next/navigation"
import AlertModal from "@/ui/components/alert-modal"

type Props = {
  storeId: string
}

const DeleteStoreModal = ({ storeId }: Props) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onSubmitDeleteStore = async () => {
    startTransition(async () => {
      const err = await deleteStoreByIdAction(storeId)

      if (!err) {
        toast.success("Store deleted");

        router.refresh()
        return
      }

      toast.error(err.error)
    })
  }

  const onChange = () => {
    setOpen(prev => !prev)
  }

  return (
    <>
      <Button onClick={onChange} variant="destructive">
        <Trash size={18} />
      </Button>
      <AlertModal isOpen={open} loading={isPending} onClose={onChange}>
        <form action={onSubmitDeleteStore}>
          <ButtonFallback variant={"destructive"} type="submit" disabled={isPending}>
            delete
          </ButtonFallback>
        </form>
      </AlertModal>
    </>
  )
}

export default DeleteStoreModal
