'use client'

import { useModalStore } from "@/lib/stores/modal-store"
import { useEffect } from "react"

const App = () => {
  const isModalOpen = useModalStore((state) => state.isOpen)
  const onModalOpen = useModalStore((state) => state.onOpen)

  useEffect(() => {
    if (!isModalOpen) {
      onModalOpen()
    }
  }, [isModalOpen, onModalOpen])

  return (
    <></>
  )
}

export default App
