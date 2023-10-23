import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(req: Request, {params}: {params: {sizeId: string}}) {
  try {
    if (!params.sizeId) {
      return new NextResponse('Size ID is required', {status: 400})
    }

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_GET]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {sizeId: string}},
) {
  try {
    const user = await currentUser()
    const {name, value} = await req.json()

    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!name) {
      return new NextResponse('Name is required', {status: 400})
    }

    if (!value) {
      return new NextResponse('Value is required', {status: 400})
    }

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', {status: 400})
    }

    const size = await db.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_PATCH]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {sizeId: string}},
) {
  try {
    const user = await currentUser()
    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', {status: 400})
    }

    const size = await db.size.delete({
      where: {
        id: params.sizeId,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_DELETE]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
