import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { signOut } from '../../auth'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirect_uri')

   await signOut({
    redirect: false
  })

  redirect(redirectTo)
}