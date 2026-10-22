---
name: start
description: Start implementation of the loaded feature in .agents/rules/current-feature.md, create a git feature branch, and update status to In Progress.
---

# Start Feature

Begins implementation of the active feature defined in [current-feature.md](../../rules/current-feature.md).

## Instructions

1. **Verify Loaded Feature**:
   - Read [current-feature.md](../../rules/current-feature.md).
   - If `## Goals` is empty or no feature is loaded, return error: *"No active feature loaded. Run `/load <spec>` or `/feature load <spec>` first."*

2. **Update Status**:
   - Change `## Status` in `current-feature.md` to `In Progress`.

3. **Branch Creation**:
   - Derive a kebab-case branch name from the feature title (e.g. `feature/volume-slider` or `fix/auth-callback`).
   - If the workspace is a Git repository, check out a new branch:
     ```bash
     git checkout -b feature/<feature-name>
     ```
   - If not a Git repository, inform the user and proceed with file updates.

4. **Implementation Plan**:
   - Display the active goals to the user.
   - Implement the requirements systematically, verifying with `npm run build` at critical checkpoints.
