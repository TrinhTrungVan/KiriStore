'use client'

import {Plus} from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'
import {DataTable} from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

import {ProductColumn, columns} from './columns'

interface ProductClientProps {
  data: ProductColumn[]
}

const ProductClient = ({data}: ProductClientProps) => {
  const router = useRouter()

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push('/admin/products/new')}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </div>
  )
}

export default ProductClient
