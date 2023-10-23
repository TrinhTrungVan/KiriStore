import {db} from '@/lib/db'

export interface IProductParams {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
  sortBy?: string
  name?: string
}

const sortMap: any = {
  createdAtDesc: {
    createdAt: 'desc',
  },
  createdAtAsc: {
    createdAt: 'asc',
  },
  priceAsc: {
    price: 'asc',
  },
  priceDesc: {
    price: 'desc',
  },
}

const getProducts = async (params: IProductParams) => {
  try {
    const {
      name,
      categoryId,
      colorId,
      isFeatured,
      sizeId,
      sortBy = 'createdAtAsc',
    } = params

    let query: any = {}

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (categoryId) {
      query.categoryId = categoryId
    }

    if (colorId) {
      query.colorId = colorId
    }

    if (isFeatured) {
      query.isFeatured = isFeatured
    }

    if (sizeId) {
      query.sizeId = sizeId
    }

    const products = await db.product.findMany({
      take: 10,
      where: query,
      include: {
        category: true,
        size: true,
        color: true,
      },
      orderBy: sortMap[sortBy],
    })

    return products
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getProducts
