'use client'

import {Plus} from 'lucide-react'
import {useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'
import {DataTable} from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

import {SizeColumn, columns} from './columns'

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient = ({data}: SizeClientProps) => {
  const router = useRouter()

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push('/admin/sizes/new')}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  )
}

export default SizeClient
