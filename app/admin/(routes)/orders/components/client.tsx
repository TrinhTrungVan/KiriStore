'use client'

import {DataTable} from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'

import {OrderColumn, columns} from './columns'

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient = ({data}: OrderClientProps) => {
  return (
    <div className="flex-col space-y-4">
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </div>
  )
}

export default OrderClient
