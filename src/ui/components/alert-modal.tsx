'use client'

import type { ReactNode } from "react"

import Modal from "./modal"
import { Button } from "./button"

type Props = {
  isOpen: boolean
  loading: boolean
  onClose: () => void
  children: ReactNode
}

const AlertModal = ({ isOpen, loading, onClose, children }: Props) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title="Are you sure?" description="this action cannot be undone.">
      <div className="flex items-center space-x-3 justify-end">
        <Button disabled={loading} onClick={onClose} variant="outline">
          cancel
        </Button>

        {children}
      </div>
    </Modal>
  )
}

export default AlertModal
