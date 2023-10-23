import React from 'react'
import {db} from '@/lib/db'
import {format} from 'date-fns'

import ColorClient from './components/client'
import {ColorColumn} from './components/columns'

const ColorsPage = async () => {
  const colors = await db.color.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: ColorColumn[] = colors.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-1 p-8 pt-6">
      <ColorClient data={formattedData} />
    </div>
  )
}

export default ColorsPage
