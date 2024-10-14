'use client';
import { Children } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui/components/dialog"

type Props = {
  title: string
  description: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
} & Children

const Modal = ({ children, title, description, isOpen, onOpenChange }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
