'use client'

import {CartItem} from '@/types'
import {MinusCircle, PlusCircle, X} from 'lucide-react'
import Image from 'next/image'
import useCart from '@/hooks/use-cart'
import {cn, formatter} from '@/lib/utils'
import toast from 'react-hot-toast'

interface CartItemProps {
  data: CartItem
}

const CartItem = ({data}: CartItemProps) => {
  const cart = useCart()
  const product = data.product

  const handleRemoveItem = () => {
    cart.removeItem(product.id)
  }

  const onIncrease = () => {
    if (data.quantity >= product.inStock) {
      toast('Out of stock.')
      return
    }

    cart.increaseQuantity(product.id)
  }

  const onDecrease = () => {
    if (data.quantity <= 1) return

    cart.decreaseQuantity(product.id)
  }

  return (
    <div className="flex-1 relative">
      <div className="absolute z-10 top-6 right-0">
        <X
          onClick={handleRemoveItem}
          className="h-8 w-8 p-1 rounded-full border-2 border-black transition cursor-pointer hover:opacity-70"
        />
      </div>
      <div className="grid grid-cols-6 border-b gap-x-4 sm:gap-x-2 py-6 relative pr-8">
        <div className="relative w-full aspect-square rounded-md overflow-hidden">
          <Image fill src={product.images[0]} alt="Image" />
        </div>
        <div className="col-start-2 col-end-4">
          <h3 className="font-bold">{product.name}</h3>
          <h3>{product.category.name}</h3>
        </div>
        <h3 className="font-bold my-auto">{formatter.format(product.price)}</h3>
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between lg:pr-8 md:pr-4">
          <MinusCircle
            onClick={onDecrease}
            size={32}
            className={cn(
              'h-8 w-8 transition cursor-pointer hover:opacity-70',
              data.quantity <= 1 &&
                'opacity-20 cursor-not-allowed hover:opacity-20',
            )}
          />
          <h3 className="font-bold select-none">{data.quantity}</h3>
          <PlusCircle
            onClick={onIncrease}
            size={32}
            className={cn(
              'h-8 w-8 transition cursor-pointer hover:opacity-70',
              data.quantity >= product.inStock && 'opacity-20 hover:opacity-20',
            )}
          />
        </div>
        <h3 className="font-bold my-auto">
          {formatter.format(product.price * data.quantity)}
        </h3>
      </div>
    </div>
  )
}

export default CartItem
