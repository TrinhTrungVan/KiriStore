import {SafeProduct} from '@/types'
import {create} from 'zustand'

interface PreviewModalStore {
  isOpen: boolean
  data?: SafeProduct
  onOpen: (data: SafeProduct) => void
  onClose: () => void
}

export const usePreviewModal = create<PreviewModalStore>(set => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: SafeProduct) => set({data, isOpen: true}),
  onClose: () => set({isOpen: false}),
}))
