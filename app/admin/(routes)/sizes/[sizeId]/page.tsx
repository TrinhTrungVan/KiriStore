import {db} from '@/lib/db'
import SizeForm from './components/size-form'

const SizePage = async ({params}: {params: {sizeId: string}}) => {
  let size
  try {
    size = await db.size.findUnique({
      where: {
        id: params.sizeId as string,
      },
    })
  } catch {
    size = null
  }

  return (
    <div className="flex-1 p-8 pt-6">
      <SizeForm initialData={size} />
    </div>
  )
}

export default SizePage
