---
name: feature
description: Master feature lifecycle manager. Orchestrates loading specs, starting branches, reviewing code quality, explaining changes, and completing features.
argument-hint: load | start | review | explain | complete
---

# Feature Workflow

Manages the full lifecycle of a feature from specification to completion.

## Working File

- [current-feature.md](../../rules/current-feature.md)

### File Structure

`current-feature.md` contains these sections:
- `# Current Feature: <Name>` — H1 heading with feature name when active
- `## Status` — `Not Started` | `In Progress` | `Completed`
- `## Goals` — Bullet points of what success looks like
- `## References` — Links to specs, documentation, or relevant source files
- `## Notes` — Additional context, constraints, or technical decisions
- `## History` — Completed features log (append only, earliest to latest)

---

## Lifecycle Actions & Sub-Skills

This main skill coordinates 5 specialized skills recognized by Antigravity:

| Action | Skill | Description |
|---|---|---|
| `load` | [`load`](../load/SKILL.md) | Load a feature spec or description into `current-feature.md` |
| `start` | [`start`](../start/SKILL.md) | Create branch, set status to `In Progress`, begin implementation |
| `review` | [`review`](../review/SKILL.md) | Verify goals, run `npm run build`, check code quality |
| `explain` | [`explain`](../explain/SKILL.md) | Document architectural decisions and summarize changes |
| `complete` | [`complete`](../complete/SKILL.md) | Confirm commit, merge branch, append to history, reset status |

---

## Usage & Execution

You can run actions through this main skill or directly invoke any sub-skill:

### 1. Via Main Skill:
- `/feature load <spec-or-description>`
- `/feature start`
- `/feature review`
- `/feature explain`
- `/feature complete`

### 2. Via Individual Sub-Skills:
- `/load <spec-or-description>`
- `/start`
- `/review`
- `/explain`
- `/complete`

If `$ARGUMENTS` is provided to `/feature`, execute the matching action according to that sub-skill's instructions. If no argument is provided, display current status from `current-feature.md` and available actions.
