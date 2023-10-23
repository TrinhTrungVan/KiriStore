import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(req: Request) {
  try {
    const colors = await db.color.findMany({})

    return NextResponse.json(colors)
  } catch (error) {
    console.log('[COLORS_GET]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function POST(req: Request) {
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

    const color = await db.color.create({
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_POST]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
