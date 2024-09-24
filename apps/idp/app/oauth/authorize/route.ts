import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { nanoid } from 'nanoid'

import { prisma } from '../../../prisma'
import { auth } from '../../../auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const responseType = searchParams.get('response_type')
  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')
  const scope = searchParams.get('scope')
  const codeChallenge = searchParams.get('code_challenge')
  const codeChallengeMethod = searchParams.get('code_challenge_method')

  if (responseType !== 'code') {
    return NextResponse.json({ error: 'unsupported_response_type' }, { status: 400 })
  }

  if (!clientId || !redirectUri || !codeChallenge || !state) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  // @TODO need validate clientId and redirectUri here...

  const session = await auth()

  // This route is no in private routes because I need check request before redirect
  // user to login to avoid users login and requests fail, so, I need redirect manually to login here
  if (!session?.user) {
    const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`
    const redirectUrl = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`

    return redirect(redirectUrl)
  }

  const oauthSession = await prisma.session.create({
    data: {
      userId: session.user.id,
      clientId,
      redirectUri,
      scope,
      codeChallenge,
      codeChallengeMethod,
      authorizationCode: nanoid(32),
      expiresAt: 10,
    }
  })

  const redirectUrl = new URL(redirectUri)
  redirectUrl.searchParams.append('code', oauthSession.authorizationCode)
  redirectUrl.searchParams.append('state', state)

  return NextResponse.redirect(redirectUrl.toString())
}
