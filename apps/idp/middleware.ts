import { auth } from "./auth"

export default auth((req) => {
  if (req.auth && ['/login', '/signup'].includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})