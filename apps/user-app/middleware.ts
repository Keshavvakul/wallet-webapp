import { withAuth } from "next-auth/middleware";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    console.log("middleware invoked");
    console.log("route is: ", req.nextUrl);

    const { nextUrl } = req;

    const token = await getToken({ req });
    console.log("token is: ", token);
    const isLoggedIn = !!token;
    console.log("isLoggedIn: ", isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isSignInRoute = nextUrl.pathname === "/auth/signin";

    if (isApiAuthRoute) {
      return null;
    }

    if (isAuthRoute) {
      console.log("isAuthRoute");
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
    }

    if (!isLoggedIn && !isPublicRoute && !isSignInRoute) {
      return Response.redirect(new URL("/auth/signin", nextUrl));
    }

    return null;
  },
  {
    callbacks: {
      authorized({ token }) {
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    // Match all routes except for the root ("/") and static files (_next, images, etc.)
    "/((?!^/$|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
