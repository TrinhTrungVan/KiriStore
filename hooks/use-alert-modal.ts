import {create} from 'zustand'

interface AlertModalStore {
  isOpen: boolean
  isLoading: boolean
  onOpen: () => void
  onClose: () => void
  setLoading: (value: boolean) => void
}

export const useAlertModal = create<AlertModalStore>(set => ({
  isOpen: false,
  isLoading: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
  setLoading: (value: boolean) => set({isLoading: value}),
}))
