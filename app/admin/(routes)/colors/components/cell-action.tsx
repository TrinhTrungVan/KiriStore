'use client'

import axios from 'axios'
import {Copy, Edit, Trash} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import toast from 'react-hot-toast'

import AlertModal from '@/components/modals/alert-modal'
import ActionTooltip from '@/components/ui/action-tooltip'
import {Button} from '@/components/ui/button'
import {ColorColumn} from './columns'

interface CellActionProps {
  data: ColorColumn
}

const CellAction = ({data}: CellActionProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(data.id)
    toast.success('Copied!')
  }

  const onEdit = () => {
    router.push(`/admin/colors/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/colors/${data.id}`)

      router.refresh()
      router.push('/admin/colors')
      toast.success('Color deleted!')
    } catch (error) {
      toast.error('Make sure you removed all products using this color first.')
    } finally {
      setLoading(false)
      setOpen(false)
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

export default CellAction
