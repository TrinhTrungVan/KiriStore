import {CartItem} from '@/types'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {toast} from 'react-hot-toast'

interface CartStore {
  items: CartItem[]
  addItem: (data: CartItem) => void
  removeItem: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          item => item.product.id === data.product.id,
        )

        if (existingItem) {
          const updatedItems = currentItems.map(item => {
            if (item.product.id === data.product.id) {
              return {...item, quantity: existingItem.quantity + data.quantity}
            }
            return item
          })

          set({items: updatedItems})
          toast.success('Item added to cart.')
          return
        }

        set({items: [...get().items, data]})
        toast.success('Item added to cart.')
      },
      removeItem: (id: string) => {
        set({items: [...get().items.filter(item => item.product.id !== id)]})
        toast.success('Item removed from cart.')
      },
      increaseQuantity: (id: string) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.product.id === id)

        if (existingItem) {
          const updatedItems = currentItems.map(item => {
            if (item.product.id === id) {
              return {...item, quantity: existingItem.quantity + 1}
            }
            return item
          })

          set({items: updatedItems})
          return
        }
      },
      decreaseQuantity: (id: string) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.product.id === id)

        if (existingItem) {
          const updatedItems = currentItems.map(item => {
            if (item.product.id === id) {
              return {...item, quantity: existingItem.quantity - 1}
            }
            return item
          })

          set({items: updatedItems})
          return
        }
      },
      removeAll: () => set({items: []}),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useCart
