import useCart from '@/hooks/use-cart'
import {formatter} from '@/lib/utils'
import axios from 'axios'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'
import toast from 'react-hot-toast'

const OrderSummary = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('vnp_ResponseCode')

  const {items, removeAll} = useCart()

  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const orderItems = items.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))

  useEffect(() => {
    if (!result) return

    if (result === '00') {
      const orderId = searchParams.get('vnp_TxnRef')

      if (!orderId) return

      try {
        ;(async () => {
          const res = await axios.patch(`/api/order/${orderId}`)
          if (res.status === 200) {
            removeAll()
            toast.success('Payment Completed!')
            router.push('/cart')
          }
        })()
      } catch {
        toast.error('Something went wrong.')
      }
    } else {
      toast.error('Something went wrong.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const handleCheckout = async () => {
    const res = await axios.post('/api/checkout/create_payment_url', {
      amount: totalPrice,
      orderItems: orderItems,
    })

    if (res.status === 200) {
      window.location = res.data.vnpUrl
      return
    }
    toast.error('Something went wrong.')
  }

  return (
    <div className="px-4 py-6 sm:p-6 rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
      <div className="flex-1 border-b border-[1px] border-neutral-400 my-4" />
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Total cost:</h3>
        <h3 className="font-bold text-lg">{formatter.format(totalPrice)}</h3>
      </div>
      <div className="flex items-center mt-8">
        <button
          onClick={handleCheckout}
          className="flex flex-1 items-center justify-center px-6 py-3 font-medium text-white bg-black rounded-3xl hover:opacity-80 transition">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
