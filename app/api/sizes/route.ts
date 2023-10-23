import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(req: Request) {
  try {
    const sizes = await db.size.findMany({})

    return NextResponse.json(sizes)
  } catch (error) {
    console.log('[SIZES_GET]', error)
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

    const size = await db.size.create({
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_POST]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
