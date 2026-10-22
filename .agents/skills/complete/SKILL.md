---
name: complete
description: Finalize the feature, ask for commit confirmation, merge to main, delete feature branch, update history, and reset current-feature.md.
---

# Complete Feature

Finalizes the current feature lifecycle according to project workflow rules.

## Instructions

1. **Pre-flight Build Verification**:
   - Run `npm run build` to verify the application builds with zero errors.
   - Do NOT commit if build fails; fix errors first.

2. **Commit Request**:
   - Ask the user for confirmation before committing (never auto-commit).
   - Use conventional commit messages (e.g. `feat: ...`, `fix: ...`, `chore: ...`).
   - Do not include AI generator tags in commit messages.

3. **Merge & Branch Cleanup**:
   - If on a feature branch and approved by user, merge into `main` and delete the feature branch.

4. **Update [current-feature.md](../../rules/current-feature.md)**:
   - Append completed feature entry to `## History`:
     ```markdown
     - **[Feature Name]** (YYYY-MM-DD): Short summary of what was completed
     ```
   - Update `## Status` to `Completed`.
   - Clear active `## Goals` and `## Notes` for the next feature.
