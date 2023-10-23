import {db} from '@/lib/db'

const getSizes = async () => {
  try {
    const sizes = await db.size.findMany({})

    return sizes
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getSizes
