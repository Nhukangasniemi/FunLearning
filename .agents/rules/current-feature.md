# Current Feature: Multi-Book & Multi-Unit Learning Hub Architecture

## Status
In Progress

## Goals
- [x] 1. Generalize database schema using Prisma 7: Added `books`, `units`, `vocabulary_items`, `quiz_questions`, `quiz_options`, `unit_progress`, and `word_progress` models with snake_case table & column mappings and CUID primary keys.
- [x] 2. Maintain full backward compatibility for the existing Starters Unit 4 "Food!" data and MVP components.
- [x] 3. Seed curriculum data for Starters (including Unit 4 Food, Unit 1 Classroom, and Unit 6 Clothes).
- [x] 4. Implement server actions and data access layer (`src/actions/curriculum.ts`, `src/actions/progress.ts`) fetching unit payload in a single roundtrip.
- [x] 5. Build reusable, pluggable game engines:
  - `FlashcardEngine.tsx` with 3D card flip, audio enunciation, self-assessment scoring, and cross-unit "Daily Smart Review" mode.
  - `SpellingEngine.tsx` with chunky unscramble letter tiles and Web Audio SFX.
  - `MemoryMatchEngine.tsx` for picture/word tactile matching.
  - `UnitGameRegistry.tsx` integrating unit-specific games (Feed Lily for Unit 4, Dress Lily for Unit 6).
- [x] 6. Implement dynamic Next.js App Router UI navigation:
  - Book roadmap: `/books/[bookSlug]`
  - 3-Step Unit Hub: `/books/[bookSlug]/units/[unitSlug]` (Step 1: Learn, Step 2: Practice Flashcards, Step 3: Play Games & Quiz).
  - All units are unlocked by default with visual completion badges and star counters.

## References
- Architectural Plan: [curriculum_ui_db_architecture_plan.md](file:///Users/google.mdm/.gemini/antigravity/brain/8f928450-9d42-4e80-bbbe-45f3395e3721/curriculum_ui_db_architecture_plan.md)
- Walkthrough: [walkthrough.md](file:///Users/google.mdm/.gemini/antigravity/brain/8f928450-9d42-4e80-bbbe-45f3395e3721/walkthrough.md)
- Project Overview: [project-overview.md](file:///Users/google.mdm/Desktop/kids-food-learning-app/.agents/rules/project-overview.md)
- Design Guidelines: [design.md](file:///Users/google.mdm/Desktop/kids-food-learning-app/.agents/rules/design.md)

## Notes
- **Neon Postgres Architecture**:
  - Direct connection (`DATABASE_URL_UNPOOLED`) is configured in `prisma.config.ts` specifically for Prisma migrations (`prisma migrate dev/deploy`) to avoid connection pooler limitations with transaction and advisory locks.
  - Web runtime queries utilize `@prisma/adapter-neon` with the pooled `DATABASE_URL` over `@neondatabase/serverless` for high-throughput connection pooling in serverless environments.
- **Pluggable Game Architecture**:
  - Generic game engines (`FlashcardEngine.tsx`, `SpellingEngine.tsx`, `MemoryMatchEngine.tsx`) operate on standard `VocabularyItemType` structures.
  - `UnitGameRegistry.tsx` maps custom unit-specific activities (e.g. "Feed Lily" for Unit 4, "Dress Lily" for Unit 6) via `gameMetadata`, allowing easy extension for future units without touching core engines.
- **Data Access Layer & Fallback**:
  - `src/actions/curriculum.ts` and `src/actions/progress.ts` fetch entire unit states in a single roundtrip.
  - If the database is initially unseeded, DAL queries gracefully fall back to `src/data/curriculum.ts`, preventing blank screens or zero-state crashes.
- **Companion Consistency**:
  - Lily remains the primary encouraging companion across all books and units, with adaptive speech prompts and Web Speech API audio synthesis.
- **Strict Quality**:
  - Strict TypeScript mode with zero `any` types.
  - Pure Tailwind CSS v4 design tokens via `@theme` variables in `src/app/globals.css`.

## Follow-up Recommendations
- Implement guest-to-authenticated progress synchronization so offline local stars merge cleanly into Neon `unit_progress` and `word_progress` when a user signs in.
- Expand Cambridge Movers and Flyers unit datasets with vector illustrations and audio.

## History
- 2026-10-22: Architectural plan created, reviewed, and approved. Feature branch `feature/curriculum-hub-structure` created.
- 2026-10-22: Generalized Prisma 7 schema (`Book`, `Unit`, `VocabularyItem`, `QuizQuestion`, `QuizOption`, `UnitProgress`, `WordProgress`), server actions DAL, and reusable game engines implemented.
- 2026-10-22: Provisioned and wired Neon Postgres project `crimson-shape-75957043` (`production` branch). Successfully applied migrations, wired pooled runtime adapter & direct migration config, and proved live end-to-end CRUD functionality. Production build and typechecks passed.
