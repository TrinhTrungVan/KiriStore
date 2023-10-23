'use client'

import useCart from '@/hooks/use-cart'
import {usePreviewModal} from '@/hooks/use-preview-modal'
import {formatter} from '@/lib/utils'
import {SafeProduct} from '@/types'
import {Expand, ShoppingCart} from 'lucide-react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

interface ProductCardProps {
  data: SafeProduct
}

const ProductCard = ({data}: ProductCardProps) => {
  const router = useRouter()
  const previewModal = usePreviewModal()
  const cart = useCart()

  const handleClick = () => {
    router.push(`/product/${data.id}`)
  }

  const onPreview = (e: any) => {
    e.stopPropagation()
    previewModal.onOpen(data)
  }

  const onAddToCart = (e: any) => {
    e.stopPropagation()
    cart.addItem({product: data, quantity: 1})
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-between bg-white group cursor-pointer rounded-xl border p-3 transition hover:shadow-md">
      <div>
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            fill
            src={data.images[0]}
            alt={data.name}
            className="aspect-square object-cover rounded-xl"
          />
          <div className="flex items-center justify-center w-full space-x-2 opacity-0 group-hover:opacity-100 transition absolute bottom-8">
            <button className="rounded-full transition hover:scale-110 bg-white p-2">
              <Expand
                onClick={onPreview}
                size={20}
                className="text-neutral-600"
              />
            </button>
            <button className="rounded-full transition hover:scale-110 bg-white p-2">
              <ShoppingCart
                onClick={onAddToCart}
                size={20}
                className="text-neutral-600"
              />
            </button>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          <p className="font-semibold text-md line-clamp-2">{data.name}</p>
          <p className="text-sm line-clamp-2">{data.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <p className="font-semibold">{formatter.format(data.price)}</p>
        <p className="text-neutral-500">{`${data.sold} sold`}</p>
      </div>
    </div>
  )
}

export default ProductCard
