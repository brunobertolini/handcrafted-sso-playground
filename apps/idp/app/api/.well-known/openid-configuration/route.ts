import { NextResponse } from 'next/server'

export async function GET(req) {
  const baseUrl = new URL(req.url).origin

  return NextResponse.json({
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/oauth/token`,
    userinfo_endpoint: `${baseUrl}/api/oauth/userinfo`,
  })
}
