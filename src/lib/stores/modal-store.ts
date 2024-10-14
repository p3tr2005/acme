import { create } from "zustand";

type ModalStoreType = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useModalStore = create<ModalStoreType>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
