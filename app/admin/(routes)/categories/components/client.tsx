'use client'

import {Plus} from 'lucide-react'
import {useRouter} from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import {Button} from '@/components/ui/button'
import {DataTable} from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'

import {CategoryColumn, columns} from './columns'

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient = ({data}: CategoryClientProps) => {
  const router = useRouter()

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push('/admin/categories/new')}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  )
}

export default CategoryClient
