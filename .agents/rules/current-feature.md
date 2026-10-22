# Current Feature: Database Seed Script & Cambridge Curriculum Population

## Status
Completed

## Goals

## References
- Seed Spec: [seed-spec.md](seed-spec.md)
- Database Spec: [data-spec.md](data-spec.md)
- Architecture & Curriculum Spec: [project-overview.md](project-overview.md)

## Notes

## History
- **Database Seed Script & Cambridge Curriculum Population** (2026-10-22): Created idempotent seed script `prisma/seed.ts` connecting via `@prisma/adapter-neon` with Prisma 7 Client. Seeded demo user `lily@funlearning.io` (password hashed with bcrypt 12 salt rounds, pro tier, email verified), 3 Cambridge YLE books (Starters, Movers, Flyers), 26 units with Oxford curriculum themes, 58 rich vocabulary items with phonics breakdowns and game metadata, 8 Cambridge YLE practice quiz questions/options, and realistic learning progress (Unit 4 completed with 15 stars, Unit 1 in progress with 6 stars, 5 mastered words). Verified multiple idempotent seed runs and live DB row counts.
- **Multi-Book & Multi-Unit Learning Hub Architecture & Neon Setup** (2026-10-22): Implemented generalized multi-book curriculum architecture (Starters, Movers, Flyers), 3D Flashcard, Spelling, and Memory Match engines, dynamic App Router roadmap (`/books/[bookSlug]` and `/books/[bookSlug]/units/[unitSlug]`), server actions DAL, Neon PostgreSQL integration with Prisma 7, 100% snake_case plural table mappings, dropped legacy models (`FoodItem`, `UserProgress`), verified zero-error production build, and merged to main.
- 2026-10-22: Architectural plan created, reviewed, and approved. Feature branch `feature/curriculum-hub-structure` created.
- 2026-10-22: Generalized Prisma 7 schema (`Book`, `Unit`, `VocabularyItem`, `QuizQuestion`, `QuizOption`, `UnitProgress`, `WordProgress`), server actions DAL, and reusable game engines implemented.
- 2026-10-22: Provisioned and wired Neon Postgres project `crimson-shape-75957043` (`production` branch). Successfully applied migrations, wired pooled runtime adapter & direct migration config, and proved live end-to-end CRUD functionality. Production build and typechecks passed.
