import {db} from '@/lib/db'

export const getTotalRevenue = async () => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
  })

  const totalRevenue = paidOrders.reduce((total, order) => {
    return total + order.totalPrice
  }, 0)

  return totalRevenue
}
