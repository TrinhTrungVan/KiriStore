'use client'

const CartHeader = () => {
  return (
    <div className="grid grid-cols-6 gap-x-4 font-bold pr-0 md:pr-4 lg:pr-8">
      <div className="col-start-1 col-end-4 lg:text-xl sm:text-sm">
        Product Details
      </div>
      <div className="lg:text-xl sm:text-sm">Price</div>
      <div className="lg:text-xl sm:text-sm">Quantity</div>
      <div className="lg:text-xl sm:text-sm">Total Price</div>
    </div>
  )
}

export default CartHeader
