import {db} from '@/lib/db'
import ColorForm from './components/color-form'

const ColorPage = async ({params}: {params: {colorId: string}}) => {
  let color
  try {
    color = await db.color.findUnique({
      where: {
        id: params.colorId as string,
      },
    })
  } catch {
    color = null
  }

  return (
    <div className="flex-1 p-8 pt-6">
      <ColorForm initialData={color} />
    </div>
  )
}

export default ColorPage
