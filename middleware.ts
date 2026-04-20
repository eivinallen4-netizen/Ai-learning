// NOTE: Middleware entrypoint: currently passes requests through unchanged, reserved for future route/auth controls.
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// NOTE: `isProtectedRoute` tracks a boolean condition used in rendering/logic.
const isProtectedRoute = createRouteMatcher(['/learn-board(.*)', '/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// NOTE: `config` stores a constant/reference used in this scope.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

