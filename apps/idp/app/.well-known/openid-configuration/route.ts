import { NextResponse } from 'next/server'

export async function GET(req) {
  const proto = req.headers.get('x-forwarded-proto')
  const origin = req.headers.get('x-forwarded-host')

  const baseUrl = `${proto}://${origin}`

  return NextResponse.json({
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    userinfo_endpoint: `${baseUrl}/oauth/userinfo`,
    end_session_endpoint: `${baseUrl}/logout`
  })
}
