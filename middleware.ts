import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(
  [
   "/dashboard/(.*)"
   , "/setting/(.*)", "/stock(.*)",
   "/api/(.*)"
  ]
)


// export default clerkMiddleware({
//   if (isProtectedRoute(req)) await auth.protect()
//   // Routes that can be accessed while signed out
//   // publicRoutes: ["/", "/sign-in", "/sign-up"],

//   // Routes that can always be accessed, and have
//   // no authentication information
//   ignoredRoutes: ["/api/public"],
// })

export default clerkMiddleware(async(auth,req)=>{
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}


