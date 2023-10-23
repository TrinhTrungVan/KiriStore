import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany({})

    return NextResponse.json(categories)
  } catch (error) {
    console.log('[CATEGORIES_GET]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}

export async function POST(req: Request) {
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

    const category = await db.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_POST]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
