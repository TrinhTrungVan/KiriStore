import {db} from '@/lib/db'

const getProduct = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
    })

    return product
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getProduct
