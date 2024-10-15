'use client';
import { Children } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/dialog"
import type { ReactNode } from "react";

type Props = {
  title: string
  description: string
  isOpen: boolean
  trigger?: ReactNode
  onOpenChange: (open: boolean) => void
} & Children

const Modal = ({ children, title, description, isOpen, onOpenChange, trigger }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger && trigger}
      </DialogTrigger>

      <DialogContent className="w-[435px]">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>

          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>

    </Dialog>
  )
}

export default Modal
