import {NextRequest, NextResponse} from 'next/server'
import {format} from 'date-fns'
import {db} from '@/lib/db'
import {OrderItem} from '@prisma/client'
import querystring from 'query-string'
import crypto from 'crypto'
import dateFormat from 'dateformat'
import {sortedObject} from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const {
      amount,
      orderInfo = 'Thanh toan',
      orderType = 'other',
      orderItems,
    } = await req.json()

    const order = await db.order.create({
      data: {
        isPaid: false,
        orderItems: {
          create: orderItems.map(
            (orderItem: {productId: string; quantity: number}) => ({
              product: {
                connect: {
                  id: orderItem.productId,
                },
              },
              quantity: orderItem.quantity,
            }),
          ),
        },
        totalPrice: amount,
      },
    })

    const ipAddr = req.headers.get('x-forwarded-for') || '127.0.0.1'

    const tmnCode = process.env.VNP_TMNCODE
    const secretKey = process.env.VNP_HASHSECRET
    let vnpUrl = process.env.VNP_URL
    const returnUrl = process.env.VNP_RETURN_URL

    const date = new Date()

    const createDate = dateFormat(date, 'yyyymmddHHmmss')

    const locale = 'vn'
    const currCode = 'VND'
    let vnp_Params: any = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = order.id
    vnp_Params['vnp_OrderInfo'] = orderInfo
    vnp_Params['vnp_OrderType'] = orderType
    vnp_Params['vnp_Amount'] = amount * 100 * 22000
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate

    vnp_Params = sortedObject(vnp_Params)

    var signData = querystring.stringify(vnp_Params, {encode: false})
    var hmac = crypto.createHmac('sha512', secretKey as string)
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, {encode: false})

    return NextResponse.json({vnpUrl})
  } catch (error) {
    console.log('[CREATE_PAYMENT_URL]', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
