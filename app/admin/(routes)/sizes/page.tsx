import React from 'react'
import {db} from '@/lib/db'
import {format} from 'date-fns'

import SizeClient from './components/client'
import {SizeColumn} from './components/columns'

const SizesPage = async () => {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: SizeColumn[] = sizes.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1 p-8 pt-6">
      <SizeClient data={formattedData} />
    </div>
  )
}

export default SizesPage
