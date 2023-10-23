import React from 'react'
import {db} from '@/lib/db'
import {format} from 'date-fns'

import CategoryClient from './components/client'
import {CategoryColumn} from './components/columns'

const CategoriesPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: CategoryColumn[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1 p-8 pt-6">
      <CategoryClient data={formattedData} />
    </div>
  )
}

export default CategoriesPage
