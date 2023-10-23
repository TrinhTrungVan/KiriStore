import React from 'react'
import {db} from '@/lib/db'
import {format} from 'date-fns'

import OrderClient from './components/client'
import {OrderColumn} from './components/columns'
import {formatter} from '@/lib/utils'

const OrdersPage = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: OrderColumn[] = orders.map(item => ({
    id: item.id,
    products: item.orderItems
      .map(orderItem => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + item.product.price
      }, 0),
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1 p-8 pt-6">
      <OrderClient data={formattedData} />
    </div>
  )
}

export default OrdersPage
