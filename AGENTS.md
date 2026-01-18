# Frontend Project AI Guidelines

This document defines how AI agents should work in this frontend codebase.
Follow these rules strictly.

---

## Project Overview

* Frontend SPA / H5 project
* Main stack: Vue 3 + TypeScript
* State management: Pinia
* UI library: Element Plus
* Build tool: Vite

---

## General Principles

* Prefer correctness over cleverness.
* Prefer minimal changes over large refactors.
* Follow existing project conventions exactly.
* Assume this is a production codebase.

---

## Code Style

### TypeScript

* Use TypeScript for all new files.
* Avoid `any`.
* Prefer explicit interfaces and types.
* Remove unused imports and variables.

### Vue

* Vue 3 only.
* Use Composition API.
* Prefer `<script setup lang="ts">`.
* Do NOT use Options API unless the existing file already does.
* Keep components focused and small.

### React (if present)

* Function components only.
* Hooks only.
* No class components.

---

## State Management

* Use Pinia for global state.
* Do NOT introduce new state management libraries.
* Prefer local state when global state is unnecessary.

---

## Routing

* Use existing routing structure.
* Do NOT duplicate routes.
* Keep route definitions explicit.
* Respect existing permission / meta conventions.

---

## UI & Styling

* Use Element Plus components and APIs.
* Do NOT invent props, events, or slots.
* Follow existing usage patterns in the project.
* Keep styling consistent with existing code (CSS / SCSS / utility classes).

---

## File & Scope Rules

* Modify only files required for the task.
* Do NOT reorganize folders unless explicitly requested.
* Do NOT refactor unrelated code.
* Do NOT rename files or symbols without a clear reason.

---

## Code Quality

* Prefer early returns.
* Avoid over-engineering.
* Avoid unnecessary abstractions.
* Keep logic readable and straightforward.

---

## Error Handling

* Handle errors explicitly where needed.
* Do NOT swallow errors silently.
* Follow existing error handling patterns.

---

## Testing

* Respect existing testing setup.
* Do NOT introduce new test frameworks.
* Add tests only when explicitly requested or when modifying critical logic.

---

## Documentation

* Do NOT generate README, markdown docs, or summary documents
  unless explicitly requested.
* Inline comments only when they add real value.

---

## Security & Safety

* Never introduce secrets or credentials.
* Do NOT log sensitive data.
* Validate user input when handling forms or external data.

---

## AI Behavior Constraints

* Prefer implementation over explanation.
* Avoid high-level architecture discussion unless requested.
* If requirements are unclear, ask ONE concise clarification question.
* Otherwise, make a reasonable assumption and proceed.

---

## Priority

If conflicts exist:

1. Follow existing code in the repository.
2. Follow this AGENTS.md.
3. Follow tool-specific rules (e.g., Kilo Code rules).

```
```
