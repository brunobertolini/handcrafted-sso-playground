import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from "next-auth/providers/credentials"
import hash from 'hash.js';

import { prisma } from './prisma'

// this is just and example to hash password without effort. Please, use a better password hash algorithm
export function hashPassword(password) {
  // return password
  return hash.sha256().update(password).digest('hex')
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
      }

      return session
    }
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // logic to salt and hash password
        const pwHash = hashPassword(credentials.password)

        // logic to verify if the user exists
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: pwHash
          }
        })

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
})

export const signUp = data =>
  prisma.user.create({
  data: {
    ...data,
    password: hashPassword(data.password)
  }
})