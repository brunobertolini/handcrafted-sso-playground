import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      issuer: process.env.AUTH_IDP_HOST,
      userinfo: `${process.env.AUTH_IDP_HOST}/oauth/userinfo`,
      wellKnown: `${process.env.AUTH_IDP_HOST}/oauth/.well-known/openid-configuration`,
      token: `${process.env.AUTH_IDP_HOST}/oauth/token`,
      authorization: `${process.env.AUTH_IDP_HOST}/oauth/authorize`,
      checks: ['pkce', 'state'],
    },
  ],
})