import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      issuer: process.env.AUTH_IDP_HOST,
      wellKnown: `${process.env.AUTH_IDP_HOST}/.well-known/openid-configuration`,
      authorization: `${process.env.AUTH_IDP_HOST}/oauth/authorize`,
      token: `${process.env.AUTH_IDP_HOST}/oauth/token`,
      userinfo: `${process.env.AUTH_IDP_HOST}/oauth/userinfo`,
      checks: ['pkce', 'state'],
    },
  ],
})