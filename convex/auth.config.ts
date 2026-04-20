// NOTE: Convex auth configuration for your backend auth provider integration.
const authConfig = {
  providers: [
    {
      // Prefer Clerk issuer domain for Convex JWT verification, with fallback
      // to existing frontend API URL to avoid breaking current local setup.
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN ?? process.env.CLERK_FRONTEND_API_URL,
      applicationID: 'convex',
    },
  ],
}

export default authConfig
