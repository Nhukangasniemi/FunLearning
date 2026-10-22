---
name: review
description: Review current feature implementation against goals in .agents/rules/current-feature.md, run build/lint checks, and verify code quality.
---

# Review Feature

Performs code review, goal verification, and build validation for the current feature.

## Instructions

1. **Verify Goals**:
   - Read [current-feature.md](../../rules/current-feature.md).
   - Check every bullet point under `## Goals` to confirm implementation is complete and functional.

2. **Run Quality & Build Checks**:
   - Execute typecheck:
     ```bash
     npx tsc --noEmit
     ```
   - Execute production build:
     ```bash
     npm run build
     ```
   - If there are errors or warnings, address them before proceeding.

3. **Code Quality Inspection**:
   - Check security (input sanitization, auth validation).
   - Check performance (unnecessary re-renders, bundle size).
   - Ensure consistency with project coding standards and Light mode UI styling.

4. **Summary & Recommendation**:
   - Output a checklist of verified goals.
   - If all checks pass, advise the user to run `/complete` (or `/feature complete`) to finalize.
