import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(
  req: Request,
  {params}: {params: {categoryId: string}},
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', {status: 400})
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_GET]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {categoryId: string}},
) {
  try {
    const user = await currentUser()
    const {name} = await req.json()

    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!name) {
      return new NextResponse('Name is required', {status: 400})
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', {status: 400})
    }

    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {categoryId: string}},
) {
  try {
    const user = await currentUser()
    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!params.categoryId) {
      return new NextResponse('Billboard ID is required', {status: 400})
    }

    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
