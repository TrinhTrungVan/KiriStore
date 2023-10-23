import {create} from 'zustand'

interface SearchModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSearchModal = create<SearchModalStore>(set => ({
  isOpen: false,
  data: undefined,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}))
