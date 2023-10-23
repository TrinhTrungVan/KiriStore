import {db} from '@/lib/db'

const getColors = async () => {
  try {
    const colors = await db.color.findMany({})

    return colors
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getColors
