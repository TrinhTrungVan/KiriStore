import {sortedObject} from '@/lib/utils'
import crypto from 'crypto'
import {NextRequest, NextResponse} from 'next/server'
import querystring from 'query-string'

export async function GET(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.url)
  let vnp_Params = Object.fromEntries(urlSearchParams.entries())
  const secureHash = vnp_Params['vnp_SecureHash']

  delete vnp_Params['vnp_SecureHash']
  delete vnp_Params['vnp_SecureHashType']

  vnp_Params = sortedObject(vnp_Params)
  const secretKey = process.env.VNP_HASHSECRET
  const signData = querystring.stringify(vnp_Params, {encode: false})
  const hmac = crypto.createHmac('sha512', secretKey as string)
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

  if (secureHash === signed) {
    const orderId = vnp_Params['vnp_TxnRef']
    const rspCode = vnp_Params['vnp_ResponseCode']
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi

    console.log('Create Order', rspCode)

    return NextResponse.json({RspCode: '00', Message: 'success'}, {status: 200})
  } else {
    return NextResponse.json(
      {RspCode: '97', Message: 'Fail checksum'},
      {status: 200},
    )
  }
}
