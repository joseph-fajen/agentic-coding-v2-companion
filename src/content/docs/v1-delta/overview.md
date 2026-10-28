---
title: Coming from V1?
description: What changed between V1 and V2 of the Agentic coding course
---

If you completed the V1 course, you already know the fundamentals. V2 doesn't replace what you learned — it reorganizes it, names things you were doing implicitly, and adds depth in areas V1 only sketched.

:::note[Is this for you?]
- **Read this when** you took the V1 course and have a V1-style setup to update.
- **Skip for now if** you didn't take V1. Pick a starting point on the [home page](/#where-to-start) instead.
:::

## The big picture

V2 is a **restructuring**, not an incremental update. The course moves from a linear 12-module sequence to a **4-phase pedagogical arc** (Use → Understand → Evolve → Scale) and introduces the **Five Primitives Framework** as the organizing principle.

**Key shifts:**

| V1 | V2 |
|----|----|
| `.agents/` folder | `.claude/` folder (proper Claude Code layout) |
| "Commands" | "Skills" (with frontmatter + structured format) |
| Implicit concepts | Explicit primitives (Rules, Subagents, MCP, Skills, Hooks) |
| Focus on using | Focus on building the thing that builds the thing |

## What you'll find here

This section maps your V1 knowledge to V2:

- **[What changed](/v1-delta/what-changed/)** — New concepts, structural reorganization, and the Five Primitives
- **[What still applies](/v1-delta/what-still-applies/)** — Core concepts that remain central (PIV loop, validation pyramid)
- **[Migration checklist](/v1-delta/migration-checklist/)** — Concrete steps to update your V1 system to V2 patterns

## Time investment

If you're short on time, do the first three steps of the [migration checklist](/v1-delta/migration-checklist/):

1. **Cut and split your rules file**: a lean CLAUDE.md, with everything else loading only when needed
2. **Add hooks** for your non-negotiables: the one entirely new primitive
3. **Add steering docs** (direction.md, engineering.md) and wire them into your skills

Then read [your workflow changed too](/v1-delta/migration-checklist/#your-workflow-changed-too). V2 replaces the PRD → plan → execute flow with epics sliced into tickets and planned just-in-time. Everything else refines or renames what you already know.

For plans, billing and what each practice asks of you to keep up, see [What it costs](/costs/).
