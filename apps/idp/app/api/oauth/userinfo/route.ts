import { NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'

import { prisma } from '../../../../prisma'

export async function GET(req) {
  const authorizationHeader = req.headers.get('authorization')
  const [, token] = authorizationHeader?.split(' ')

  if (!token) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }

  try {
    const decoded = await decode({
      token,
      secret: `${process.env.AUTH_SECRET}`,
      salt: '',
    })

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }
}