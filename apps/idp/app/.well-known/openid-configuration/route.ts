import { NextResponse } from 'next/server'

export async function GET(req) {
  const baseUrl = new URL(req.url).origin

  return NextResponse.json({
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    userinfo_endpoint: `${baseUrl}/oauth/userinfo`,
  })
}
