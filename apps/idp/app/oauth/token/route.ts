import { NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'

import { prisma } from '../../../prisma'

function base64UrlEncode(arrayBuffer) {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hashBuffer);
}

export async function POST(request) {
  const body = await request.text()
  const params = new URLSearchParams(body)

  const code = params.get('code')
  const codeVerifier = params.get('code_verifier')
  const grantType = params.get('grant_type')

  if (grantType !== 'authorization_code') {
    return NextResponse.json({
      error: 'unsupported_grant_type',
      error_description: 'The authorization grant type is not supported by the server.',
    }, { status: 400 })
  }

  // Verificar se o código de autorização existe e é válido
  const oauthSession = await prisma.session.findFirst({
    where: { authorizationCode: code }
  })

  if (!oauthSession) {
    return NextResponse.json({
      error: 'invalid_grant',
      error_description: 'The provided authorization code is invalid or expired.',
    }, { status: 400 })
  }

  // Outras validações (ex: PKCE)
  if (!codeVerifier) {
    return NextResponse.json({
      error: 'invalid_request',
      error_description: 'The "code_verifier" is required for PKCE.',
    }, { status: 400 })
  }

  const calculatedCodeChallenge = await generateCodeChallenge(codeVerifier)

  if (!calculatedCodeChallenge) {
    return NextResponse.json({
      error: 'invalid_request',
      error_description: 'Unsupported code_challenge_method.',
    }, { status: 400 })
  }

  if (calculatedCodeChallenge !== oauthSession.codeChallenge) {
    return NextResponse.json({
      error: 'invalid_grant',
      error_description: 'The provided "code_verifier" is invalid.',
    }, { status: 400 })
  }

  const accessToken = await encode({
    token: {
      sub: oauthSession.userId,
      aud: oauthSession.clientId,
    },
    maxAge: 3600, // 1h
    secret: `${process.env.AUTH_SECRET}`,
    salt: 'SALT',
  })

  const refreshToken = await encode({
    token: {
      sub: oauthSession.userId,
      aud: oauthSession.clientId,
    },
    maxAge: 3600 * 60,
    secret: `${process.env.AUTH_SECRET}`,
    salt: 'SALT',
  })

  return NextResponse.json({
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: refreshToken,
  })
}
