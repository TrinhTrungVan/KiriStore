import {db} from '@/lib/db'

const getCategories = async () => {
  try {
    const categories = await db.category.findMany({})

    return categories
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getCategories
