# FunEnglish

An English learning hub for kids from 6-13 years old.

## Active Rules
@[Coding Standards](rules/coding-standards.md)
@[AI Interaction](rules/ai-interaction.md)

## Reference Documents (Read on Demand)
- **Architecture & Curriculum Spec**: [project-overview.md](rules/project-overview.md)
- **Design System & Palette**: [design.md](rules/design.md)
- **Active Feature Tracker**: [current-feature.md](rules/current-feature.md)
- **Database & Prisma Setup Spec**: [data-spec.md](rules/data-spec.md)

## Commands
- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — eslint (flat config via `eslint.config.mjs`)
- `npm run prisma:generate` — generate Prisma 7 client
- `npm run prisma:migrate` — create and apply database migration

There is no test suite configured in this project.
