import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      issuer: process.env.AUTH_IDP_HOST,
      wellKnown: `${process.env.AUTH_IDP_HOST}/api/.well-known/openid-configuration`,
      authorization: `${process.env.AUTH_IDP_HOST}/api/oauth/authorize`,
      token: `${process.env.AUTH_IDP_HOST}/api/oauth/token`,
      userinfo: `${process.env.AUTH_IDP_HOST}/api/oauth/userinfo`,
      checks: ['pkce', 'state'],
    },
  ],
})