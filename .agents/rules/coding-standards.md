# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for item/collection pages

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS for all styling (Tailwind v4 with CSS `@theme` variables)
- Use shadcn/ui components where applicable
- No inline styles
- Light mode default (soft kid-friendly pastel candy accents, high contrast readability); do NOT use dark mode as default

## Database

- Use Prisma ORM for all database operations (Prisma 7 pinned `7.10.0` with `@prisma/adapter-neon`)
- Always use `prisma migrate dev` (or `npm run prisma:migrate`) for schema changes (not `db push`)
- Run `npm run prisma:generate` after any schema change — Prisma 7's `migrate dev` does not automatically regenerate the client, and a stale client fails with `TableDoesNotExist`
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must run `prisma migrate deploy` before the app starts

### Database naming

- Tables and columns are `snake_case`; tables are plural (`food_items`, `user_progress`)
- Primary keys use CUID strings: `@id @default(cuid())` (matches Auth.js v5 standard)
- Prisma models stay PascalCase and fields camelCase — bridge them with `@map` on fields and `@@map` on models and enums
- Every new model and every multi-word field needs a mapping; Postgres lowercases unquoted identifiers, so an unmapped `createdAt` forces `"createdAt"` quoting forever in raw SQL

## Data Fetching

- Server components fetch directly with Prisma
- Client components use Server Actions
- Validate all inputs with Zod

## Error Handling

- Use try/catch in Server Actions
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible