import React from 'react'
import {db} from '@/lib/db'
import {formatter} from '@/lib/utils'
import {format} from 'date-fns'

import ProductClient from './components/client'
import {ProductColumn} from './components/columns'

const ProductsPage = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: ProductColumn[] = products.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1 p-8 pt-6">
      <ProductClient data={formattedData} />
    </div>
  )
}

export default ProductsPage
