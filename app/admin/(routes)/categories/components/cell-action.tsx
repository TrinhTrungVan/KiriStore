'use client'

import axios from 'axios'
import {useState} from 'react'
import {Copy, Edit, Trash} from 'lucide-react'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import AlertModal from '@/components/modals/alert-modal'

import {CategoryColumn} from './columns'
import ActionTooltip from '@/components/ui/action-tooltip'

interface CellActionProps {
  data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(data.id)
    toast.success('Category ID copied to clipboard.')
  }

  const onEdit = () => {
    router.push(`/admin/categories/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/categories/${data.id}`)
      toast.success('Category deleted.')
      router.refresh()
    } catch (error) {
      toast.error(
        'Make sure you removed all products using this category first.',
      )
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center gap-x-4">
        <ActionTooltip label="Copy ID" align="center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Edit" align="center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Delete" align="center">
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        </ActionTooltip>
      </div>
    </>
  )
}
