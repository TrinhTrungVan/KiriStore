'use client'

import {Modal} from '@/components/ui/modal'
import {usePreviewModal} from '@/hooks/use-preview-modal'
import Gallery from '../store/gallery'
import {formatter} from '@/lib/utils'
import {ShoppingCart} from 'lucide-react'

const PreviewModal = () => {
  const previewModal = usePreviewModal()
  const product = usePreviewModal(state => state.data)

  if (!product) {
    return null
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h3 className="font-bold text-lg">{product?.name}</h3>
          <h3 className="text-neutral-600 font-medium mb-2">
            {product?.category.name}
          </h3>
          <hr />
          <div className="mt-2">
            <h3 className="font-bold mb-2">
              Size:
              <span className="font-normal ml-2">{product?.size.value}</span>
            </h3>
            <h3 className="flex flex-row font-bold">
              Color:
              <div
                className="h-6 w-6 rounded-full border border-black ml-2"
                style={{backgroundColor: product?.color.value}}
              />
            </h3>
          </div>
          <div className="flex items-center mt-8">
            <h3 className="font-bold text-xl mr-8">
              {formatter.format(product?.price || 0)}
            </h3>
            <button className="flex items-center px-6 py-3 font-medium text-white bg-black rounded-3xl hover:opacity-80 transition">
              Add To Cart
              <ShoppingCart className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal
