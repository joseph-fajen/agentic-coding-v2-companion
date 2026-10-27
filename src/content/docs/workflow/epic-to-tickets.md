---
title: Epic to tickets
description: Research, ground, and slice work before you build
---

:::caution[Draft]
This page is a stub. Content to be extracted from course videos 1.10, 1.11, and 1.12.
:::

## Overview

<!--
Course lessons:
- 1.10 Epic Research: Make Sure What You're Building is Worth Building! (21:31)
- 1.11 Grounding Your Epic in the Codebase (21:46)
- 1.12 From Epic to Tickets: Scope the Work Before You Build (15:16)

Key questions this page should answer:
- What's an "epic" in agentic coding?
- How do you research before building?
- How do you ground an epic in an existing codebase?
- How do you slice an epic into PIV-sized tickets?
- What makes a ticket "PIV-sized"?
-->

An epic is a chunk of work too big for one R-PIV loop. The workflow here is: **research it, ground it in the codebase, slice it into tickets** — then run PIV on each ticket.

## Epic research (1.10)

<!-- TODO: Extract from video script -->

Before you build anything, answer: **Is this worth building?**

Research isn't optional — it's the first defense against wasted work:

- What problem does this solve?
- Who has this problem?
- What's the evidence?
- What already exists?

### The research beat

<!-- TODO: Extract from video script -->

The "research beat" is the habit of validating before building:

1. **User behavior first** — real usage, not assumptions
2. **Existing solutions** — what's already out there?
3. **Scope check** — is this actually one epic or three?

## Grounding in the codebase (1.11)

<!-- TODO: Extract from video script -->

Once you know *what* you're building, you need to know *how* it fits:

- Where does this live in the architecture?
- What existing code does it touch?
- What patterns does the codebase already use?
- What constraints does the existing system impose?

### Architecture decisions

<!-- TODO: Extract from video script -->

Grounding produces architecture decisions:

- Integration points with existing code
- New abstractions needed
- Migration or compatibility concerns
- Test strategy

These decisions become Layer 2 context for the implementation tickets.

## Slicing into tickets (1.12)

<!-- TODO: Extract from video script -->

An epic becomes tickets. Each ticket should be:

- **PIV-sized** — completable in one R-PIV loop
- **Independent** — can be worked in parallel (where possible)
- **Testable** — has clear success criteria
- **Ordered** — dependencies are explicit

### What's "PIV-sized"?

<!-- TODO: Extract from video script -->

A ticket is PIV-sized when:

- The agent can hold the full context
- The change is reviewable in one pass
- Tests can verify it works
- It results in one mergeable PR

### Parallelization

<!-- TODO: Extract from video script -->

Good slicing enables parallel work:

- Independent tickets can run in separate worktrees
- Dependencies are explicit in ticket ordering
- Merge conflicts are minimized by clean boundaries

## The full flow

```
Epic
  ↓ Research (is it worth it?)
  ↓ Ground (how does it fit?)
  ↓ Slice (what are the tickets?)
  ↓
Tickets → PIV Loop → Shipped PRs
```

## Key takeaways

<!-- TODO: Extract from video script -->

- Research before you build — validate the epic
- Ground the epic in your codebase — architecture decisions first
- Slice into PIV-sized tickets — one loop, one PR
- Good slicing enables parallelization

---

**Video references:**
- Course 1.10 — Epic Research: Make Sure What You're Building is Worth Building!
- Course 1.11 — Grounding Your Epic in the Codebase
- Course 1.12 — From Epic to Tickets: Scope the Work Before You Build
