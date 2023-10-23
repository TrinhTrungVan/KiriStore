import {NextResponse} from 'next/server'
import {db} from '@/lib/db'
import {currentUser} from '@/lib/current-user'

export async function GET(
  req: Request,
  {params}: {params: {productId: string}},
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', {status: 400})
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {productId: string}},
) {
  try {
    const user = await currentUser()
    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', {status: 400})
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {productId: string}},
) {
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
      sold,
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

    if (!params.productId) {
      return new NextResponse('Product id is required', {status: 400})
    }

    if (!name) {
      return new NextResponse('Name is required', {status: 400})
    }

    if (!description) {
      return new NextResponse('Description is required', {status: 400})
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

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        categoryId,
        colorId,
        sizeId,
        images,
        inStock,
        sold,
        isFeatured,
        isArchived,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}
