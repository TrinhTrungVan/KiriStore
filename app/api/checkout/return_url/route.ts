import querystring from 'query-string'
import crypto from 'crypto'
import {NextRequest, NextResponse} from 'next/server'
import {sortedObject} from '@/lib/utils'

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
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    return NextResponse.json({code: vnp_Params['vnp_ResponseCode']})
  } else {
    return NextResponse.json({code: '97'})
  }
}
