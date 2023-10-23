'use client'

import {Plus} from 'lucide-react'
import {useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'
import {DataTable} from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

import {ColorColumn, columns} from './columns'

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient = ({data}: ColorClientProps) => {
  const router = useRouter()

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/admin/colors/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </div>
  )
}

export default ColorClient
