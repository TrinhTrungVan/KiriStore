import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(req: Request, {params}: {params: {colorId: string}}) {
  try {
    if (!params.colorId) {
      return new NextResponse('Color ID is required', {status: 400})
    }

    const color = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_GET]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {colorId: string}},
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

    if (!params.colorId) {
      return new NextResponse('Color ID is required', {status: 400})
    }

    const color = await db.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_PATCH]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {colorId: string}},
) {
  try {
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    if (!user.isAdmin) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    if (!params.colorId) {
      return new NextResponse('Color ID is required', {status: 400})
    }

    const color = await db.color.delete({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_DELETE]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
