'use client'

import { signOut } from "next-auth/react"

export const LogoutButton = ({ className }) => (
  <a className={className} onClick={() => signOut()}>
    Logout
 </a>
)