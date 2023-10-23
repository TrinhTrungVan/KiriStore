'use client'

import useCart from '@/hooks/use-cart'
import {cn, formatter} from '@/lib/utils'
import {SafeProduct} from '@/types'
import {MinusCircle, PlusCircle, ShoppingCart} from 'lucide-react'
import React, {useEffect, useState} from 'react'

interface ProductATCProps {
  data: SafeProduct | null
}

const ProductATC = ({data}: ProductATCProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const cart = useCart()

  const onIncrease = () => {
    if (!data?.inStock) return
    if (quantity >= data?.inStock) return

    setQuantity(value => value + 1)
  }

  const onDecrease = () => {
    if (quantity <= 1) return

    setQuantity(value => value - 1)
  }

  const onAddToCart = () => {
    if (!data) return
    cart.addItem({product: data, quantity: quantity})
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null

  if (!isMounted) return null

  return (
    <>
      <div className="grid grid-cols-2 mt-8">
        <div className="flex flex-row items-center">
          <h3 className="font-bold">Quantity:</h3>
          <span className="font-normal ml-2">
            <div className="flex flex-row items-center justify-between ml-2 w-24">
              <MinusCircle
                onClick={onDecrease}
                size={32}
                className={cn(
                  'h-8 w-8 transition cursor-pointer hover:opacity-70',
                  quantity <= 1 &&
                    'opacity-20 cursor-not-allowed hover:opacity-20',
                )}
              />
              <span className="font-bold text-xl select-none">{quantity}</span>
              <PlusCircle
                onClick={onIncrease}
                size={32}
                className={cn(
                  'h-8 w-8 transition cursor-pointer hover:opacity-70',
                  quantity >= data.inStock &&
                    'opacity-20 cursor-not-allowed hover:opacity-20',
                )}
              />
            </div>
          </span>
        </div>
        <h3 className="flex flex-row font-bold items-center">
          In stock:
          <span className="font-bold text-xl ml-2">{data.inStock}</span>
        </h3>
      </div>
      <div className="flex items-center mt-8">
        <h3 className="font-bold text-3xl mr-8">
          {formatter.format(data.price)}
        </h3>
        <button
          onClick={onAddToCart}
          className="flex items-center px-6 py-3 font-medium text-white bg-black rounded-3xl hover:opacity-80 transition">
          Add To Cart
          <ShoppingCart className="ml-2" />
        </button>
      </div>
    </>
  )
}

export default ProductATC
