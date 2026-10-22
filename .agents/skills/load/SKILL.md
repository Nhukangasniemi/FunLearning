---
name: load
description: Load a feature spec or description into .agents/rules/current-feature.md and set status to Not Started.
argument-hint: [spec-name or inline description]
---

# Load Feature

Loads a feature specification or description into [current-feature.md](../../rules/current-feature.md).

## Instructions

1. **Parse Input** (`$ARGUMENTS`):
   - **Filename**: If single word without spaces (e.g. `navbar` or `audio-player`), search for a matching spec file in `specs/{name}.md`, `features/{name}.md`, or `.agents/rules/{name}.md`.
   - **Inline Description**: If multiple words, treat as inline feature description and deduce clear, testable goals.
   - **Empty**: If no argument provided, ask the user: *"Please provide a spec filename or feature description to load."*

2. **Update [current-feature.md](../../rules/current-feature.md)**:
   - Set H1 heading to `# Current Feature: <Feature Name>`.
   - Set `## Status` to `Not Started`.
   - Write clear, testable goals as bullet points under `## Goals`.
   - Add links to specs or related files under `## References`.
   - Add any technical constraints or notes under `## Notes`.

3. **Confirm & Next Step**:
   - Present a concise summary of the loaded feature.
   - Advise the user to run `/start` (or `/feature start`) to begin implementation.
