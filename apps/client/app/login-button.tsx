'use client'

import { signIn } from "next-auth/react"

export const LoginButton = ({ className }) => (
  <a className={className} onClick={() => signIn('idp')}>
    Login
 </a>
)