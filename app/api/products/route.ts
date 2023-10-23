import {NextResponse} from 'next/server'
import {db} from '@/lib/db'
import {currentUser} from '@/lib/current-user'

const PRODUCTS_BATCH = 5

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    const body = await req.json()

    const {
      name,
      description,
      price,
      categoryId,
      colorId,
      sizeId,
      inStock,
      images,
      isFeatured,
      isArchived,
    } = body

    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!name) {
      return new NextResponse('Name is required', {status: 400})
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', {status: 400})
    }

    if (!price) {
      return new NextResponse('Price is required', {status: 400})
    }

    if (!categoryId) {
      return new NextResponse('Category id is required', {status: 400})
    }

    if (!colorId) {
      return new NextResponse('Color id is required', {status: 400})
    }

    if (!sizeId) {
      return new NextResponse('Size id is required', {status: 400})
    }

    const product = await db.product.create({
      data: {
        name,
        description,
        price,
        isFeatured,
        isArchived,
        inStock,
        categoryId,
        colorId,
        sizeId,
        images,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const colorId = searchParams.get('colorId') || undefined
    const sizeId = searchParams.get('sizeId') || undefined
    const isFeatured = searchParams.get('isFeatured')
    const page = parseInt(searchParams.get('page') || '') || 1

    const products = await db.product.findMany({
      skip: PRODUCTS_BATCH * page,
      take: PRODUCTS_BATCH,
      where: {
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}
