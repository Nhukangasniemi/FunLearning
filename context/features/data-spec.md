# Prisma + Neon PostgreSQL Setup

## Overview

Set up Prisma ORM with Neon PostgreSQL database.

## Requirements

- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md (this will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes

## Notes

We will have a development branch that we work on that will be in DATABASE_URL and then we will have a production branch. So we ALWAYS create migrations and never push directly unless specified.

IMPORTANT! Use Prisma 7, which has some breaking changes. Read the entire upgrade guide at https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 to get a good idea of the changes.

You can also look at the setup guide here - https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

---

## Current Verified Implementation & Antigravity Reference

### 1. Connection Strategy
* **Runtime Queries (Web App)**: Uses `@prisma/adapter-neon` in `src/lib/prisma.ts` with `DATABASE_URL` pointing to Neon's connection pooler (`*-pooler.c-8.eu-central-1.aws.neon.tech`) over WebSockets/HTTP.
* **Database Migrations (`prisma migrate dev` / `prisma migrate deploy`)**: Configured in `prisma.config.ts` to use `DATABASE_URL_UNPOOLED` directly (`*.c-8.eu-central-1.aws.neon.tech`) to support advisory locks and DDL transactions.

### 2. Implemented Schema Models ([`prisma/schema.prisma`](../../prisma/schema.prisma))
* **100% snake_case Database Convention**:
  * All database tables use lowercase plural `snake_case` mappings via `@@map`: `users`, `accounts`, `sessions`, `verification_tokens`, `books`, `units`, `vocabulary_items`, `quiz_questions`, `quiz_options`, `unit_progress`, `word_progress`.
  * All multi-word columns use `@map`: `created_at`, `updated_at`, `email_verified`, `is_pro`, `stripe_customer_id`, `unit_id`, `display_name`, `example_sentence`, etc.
* **NextAuth v5 Models**:
  * `User` (`users`): CUID PK, Stripe fields, relations with cascade deletes to auth and progress models.
  * `Account` (`accounts`): Composite ID `@@id([provider, providerAccountId])`, `onDelete: Cascade` to `User`.
  * `Session` (`sessions`): Unique `sessionToken`, `onDelete: Cascade` to `User`.
  * `VerificationToken` (`verification_tokens`): Composite ID `@@id([identifier, token])`.
* **Curriculum Hierarchy**:
  * `Book` (`books`): CUID PK, unique `slug`, series classification ("Starters", "Movers", "Flyers"), sort ordering.
  * `Unit` (`units`): CUID PK, relation to `Book` with `onDelete: Cascade`, unique `[bookId, slug]`, index on `[bookId, sortOrder]`.
  * `VocabularyItem` (`vocabulary_items`): CUID PK, relation to `Unit` (`onDelete: Cascade`), optional creator relation to `User` (`onDelete: SetNull`), index on `[unitId, sortOrder]`, flexible `gameMetadata` JSON for unit-specific mini-games.
  * `QuizQuestion` (`quiz_questions`): CUID PK, relation to `Unit` (`onDelete: Cascade`), index on `[unitId, sortOrder]`.
  * `QuizOption` (`quiz_options`): CUID PK, relation to `QuizQuestion` (`onDelete: Cascade`), optional reference to `VocabularyItem` (`onDelete: SetNull`).
  * `UnitProgress` (`unit_progress`): CUID PK, unique `[userId, unitId]`, cascade deletes on `User` and `Unit`.
  * `WordProgress` (`word_progress`): CUID PK, unique `[userId, vocabularyItemId]`, index on `[userId, masteryLevel]`, cascade deletes on `User` and `VocabularyItem`.

### 3. Workflow Commands
* Generate Prisma Client: `npm run prisma:generate` (always required after schema changes in Prisma 7).
* Create & Apply Migrations: `npx prisma migrate dev` (dev branch) or `npx prisma migrate deploy` (production branch).
* Verify Sync: `npx prisma migrate status`.

