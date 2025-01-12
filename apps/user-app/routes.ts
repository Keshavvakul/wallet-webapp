/**
 * An array of routes that are accessible to public
 * These routes donot need authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * The prefix to api authentication routes 
 * Routes starting with this prefix will be used for api authentication purposes
 * This route is never blocked, it will be allowed to both logged in and logged out users
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}The page isn’t redirecting properly

Firefox has detected that the server is redirecting the request for this address in a way that will never complete.

    This problem can sometimes be caused by disabling or refusing to accept cookies.
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"