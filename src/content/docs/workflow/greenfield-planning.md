---
title: Greenfield planning
description: PRD and architecture before you write code
---

:::caution[Draft]
This page is a stub. Content to be extracted from course video 1.8.
:::

## Overview

<!--
Course lesson: 1.8 Greenfield Planning: PRD and Architecture Before You Write Code (19:31)

Key questions this page should answer:
- What is a PRD in the context of AI-assisted coding?
- When do you need greenfield planning vs jumping straight in?
- How does planning differ when an AI agent will do the implementation?
- What's the minimum viable PRD for a solo project?
-->

When you're starting fresh — no codebase, no constraints — the temptation is to just start prompting. But **the agent can only be as good as your plan.** Greenfield planning is how you give the agent something worth building.

## When you need this

- Starting a new project from scratch
- Adding a major new subsystem to an existing project
- Any work where the *what* and *how* aren't already defined

## The PRD for AI coding

<!-- TODO: Extract from video script -->

A PRD (Product Requirements Document) in agentic coding isn't a 50-page spec. It's the minimum context the agent needs to make good decisions:

1. **What you're building** — the core functionality
2. **What you're NOT building** — explicit scope boundaries
3. **Key constraints** — tech stack, performance requirements, integrations
4. **Success criteria** — how you'll know it works

## Architecture before code

<!-- TODO: Extract from video script -->

Before the agent writes line one, you need:

- **Directory structure** — where things live
- **Core abstractions** — the main entities and their relationships
- **Integration points** — how it connects to the outside world

## The handoff to Layer 1

<!-- TODO: Extract from video script -->

Your greenfield planning becomes your initial Layer 1 context:
- The PRD informs your `direction.md`
- Architecture decisions seed your `engineering.md`
- Constraints become rules in your CLAUDE.md

## Key takeaways

<!-- TODO: Extract from video script -->

- Planning moves upstream when AI does the implementation
- The PRD is for the agent, not a stakeholder
- Architecture decisions are Layer 1 context — they persist
- Greenfield planning is faster than you think when you know the shape

---

**Video reference:** Course 1.8 — Greenfield Planning: PRD and Architecture Before You Write Code
