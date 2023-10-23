import {currentUser} from '@/lib/current-user'
import {db} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function PATCH(
  req: Request,
  {params}: {params: {orderId: string}},
) {
  try {
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthenticated', {status: 401})
    }

    const order = await db.order.update({
      where: {
        id: params.orderId,
      },
      include: {
        orderItems: true,
      },
      data: {
        isPaid: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.log('[SIZE_PATCH]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
