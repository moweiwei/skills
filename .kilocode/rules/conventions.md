# Frontend Engineering Rules for Kilo Code

## Core Goal

* Produce correct, production-ready frontend code.
* Prefer minimal, direct solutions.
* Optimize for low token usage.

## Output Discipline (Very Important)

* Do NOT write summaries, overviews, or conclusions.
* Do NOT restate the task.
* Do NOT explain obvious code.
* Output only what is necessary:

  * Code
  * Minimal inline comments if truly needed

## Token Efficiency

* Be concise.
* Avoid verbose reasoning.
* Do NOT output chain-of-thought or internal analysis.
* Prefer code over text.

## Framework Conventions

* Vue: Vue 3 + Composition API only.
* Prefer `<script setup lang="ts">`.
* State management: Pinia.
* Router: vue-router (explicit route config).
* React: Functional components + hooks only.
* No class components.

## UI Library

* Element Plus preferred.
* Use official APIs only.
* Do NOT invent props, slots, or components.
* Follow existing project usage patterns.

## TypeScript Rules

* Strict typing.
* Avoid `any`.
* Prefer explicit interfaces/types.
* Remove unused imports and variables.

## Code Quality

* Avoid over-engineering.
* Prefer early returns.
* No unnecessary abstractions.
* Keep changes minimal and scoped.

## File Scope

* Modify only files required for the task.
* Do NOT refactor unrelated code.
* Do NOT reorganize folders unless explicitly requested.

```
```
