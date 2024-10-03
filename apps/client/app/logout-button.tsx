import { headers } from 'next/headers'

export const LogoutButton = async ({ className }) => {
  const res = await fetch(`${process.env.AUTH_IDP_HOST}/.well-known/openid-configuration`)
  const data = await res.json()

  const headerList = headers()
  const proto = headerList.get('x-forwarded-proto')
  const host = headerList.get('x-forwarded-host')

  const redirectTo = `${proto}://${host}/logout`

  return (
    <a className={className} href={`${data.end_session_endpoint}?redirect_uri=${encodeURI(redirectTo)}`}>
      Logout
  </a>
  )
}