# Project Notes (How This Code Works)

This file explains your app in plain language so you can quickly remember what each part does.

## 1) Big Picture

Your app is a Next.js app that does 3 main things:

1. Marketing landing page (`/`) with sections and a resource input.
2. Learn Board (`/learn-board`) where study actions run from saved resource text.
3. Test runner (`/tests`) that reads quiz questions from a URL `payload`.

Auth is handled by Clerk, and Convex client setup is present for backend usage.

## 2) Core User Flow

1. User opens home page (`app/page.tsx`).
2. User pastes text or uploads file in `ResourceInput` (`components/ResourceInput.tsx`).
3. On submit:
   - If signed out, user is redirected to sign-in.
   - If signed in, the app saves a `LearnBoardPayload` to `sessionStorage`.
4. App navigates to `/learn-board`.
5. Learn Board loads that payload and enables the first 2 action cards (exercise/flashcard simulation).

## 3) Data Shapes You Use

### Learn Board payload
Defined in `lib/learn-board-state.ts`:

```ts
type LearnBoardPayload = {
  sourceText: string
  resourceName: string
  createdAt: number
}
```

Stored in browser `sessionStorage` under:
`learn_board_payload:latest`

### Test page payload (`/tests`)
Read from query param `?payload=...` in `app/tests/page.tsx`.
Expected decoded JSON is an array of:

```ts
{
  question: string
  answer: string
  answers: string[]
}
```

If payload is missing or invalid, it falls back to `dummyQuestions`.

## 4) File-by-File Notes

### App routes

- `app/layout.tsx`
  - Root layout.
  - Wraps app with Clerk provider, loading provider, Convex provider.
  - Shows global top nav via `RouteTop`.
- `app/page.tsx`
  - Landing page composition (hero + all marketing sections + footer).
- `app/learn-board/page.tsx`
  - Reads saved resource payload.
  - Shows gated UI (sign-in required).
  - Renders 16 cards, with first 2 interactive.
  - Simulates async action state (`loading`, `ready`, `error`).
- `app/tests/page.tsx`
  - Single-question quiz flow.
  - Parses `payload` from URL.
  - Tracks selected answers and submit results.
- `app/dashboard/page.tsx`
  - Dashboard-style metrics/cards page.
- `app/sign-in/[[...sign-in]]/page.tsx`
  - Clerk sign-in route.
- `app/sign-up/[[...sign-up]]/page.tsx`
  - Clerk sign-up route.
- `app/globals.css`
  - Global styles/tokens.

### Shared components

- `components/Top.tsx`
  - Sticky header navigation.
  - Desktop nav + mobile hamburger menu.
  - Handles auth actions in nav.
- `components/RouteTop.tsx`
  - Hides top nav on sign-in/sign-up routes.
- `components/Footer.tsx`
  - Footer links and branding.
- `components/ResourceInput.tsx`
  - Textarea + file upload + submit.
  - Handles sign-in redirect and saving payload.
- `components/LoadingScreen.tsx`
  - Context + full-screen loading state.
- `components/ConvexClientProvider.tsx`
  - Convex React client provider.

### Landing sections (`components/sections/*`)

- `HeroSection.tsx`: main headline + `ResourceInput`.
- `ProblemSection.tsx`: user pain points.
- `PassiveActiveSection.tsx`: passive vs active learning.
- `HowItWorksSection.tsx`: process steps.
- `FeatureBreakdownSection.tsx`: feature details.
- `RetentionDashboardSection.tsx`: retention preview.
- `BeforeAfterSection.tsx`: comparison framing.
- `SocialProofSection.tsx`: testimonials.
- `ComparisonTableSection.tsx`: competitive comparison.
- `WhoItsForSection.tsx`: target users.
- `FaqSection.tsx`: FAQs.
- `FinalCtaSection.tsx`: final action section.
- `Scribble.tsx`: decorative image component.
- `index.ts`: barrel export for section imports.

### UI primitives (`components/ui/*`)

- `button.tsx`: reusable button variants.
- `card.tsx`: reusable card structure.
- `separator.tsx`: divider.
- `breadcrumb.tsx`: breadcrumb primitive.

### Lib/helpers

- `lib/learn-board-state.ts`
  - Save/read Learn Board payload to session storage.
- `lib/clerk-appearance.ts`
  - Clerk style config.
- `lib/utils.ts`
  - Utility helpers (e.g., class merging).

### Backend/config

- `convex/auth.config.ts`
  - Convex auth configuration.
- `middleware.ts`
  - Request middleware entrypoint.

## 5) Things To Remember While Building

1. `sessionStorage` is per browser tab/session, not permanent.
2. `use client` components run in browser and can use hooks/state.
3. URL `payload` in `/tests` must be encoded JSON string.
4. Guard routes properly when a page requires auth or saved data.
5. Keep UI primitives in `components/ui` simple and reusable.

## 6) Suggested Learning Path In Your Own Code

1. Start at `app/layout.tsx` to understand global providers.
2. Read `app/page.tsx` + `components/ResourceInput.tsx`.
3. Read `lib/learn-board-state.ts` to understand data passing.
4. Read `app/learn-board/page.tsx` for stateful UI patterns.
5. Read `app/tests/page.tsx` for URL-driven data flow.
