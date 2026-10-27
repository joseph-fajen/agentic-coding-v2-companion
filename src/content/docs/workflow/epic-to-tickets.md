---
title: Epic to tickets
description: Research, ground, and slice work before you build
---

:::tip[TL;DR — The brownfield daily driver]
An epic is a bet. Before you build it: **research** it against reality (confirm, reshape, or veto), **ground** it in your codebase (architecture decisions), then **slice** it into PIV-sized tickets. Each ticket runs one loop, produces one PR.
:::

## Overview

An epic is a chunk of work too big for one R-PIV loop. The workflow here is: **research it, ground it in the codebase, slice it into tickets** — then run PIV on each ticket.

This is the **brownfield daily driver** — most of your real work is epics on an existing codebase.

## Epic research

Before you build anything, answer: **Is this worth building?**

An epic is a **hypothesis**, not a fact. The Research beat is where you test it against reality *before* a line of the plan exists.

> In 2019 Pendo found that ~80% of shipped features are rarely or never used. Agents let us ship faster, which means we can ship *unused* features faster. DORA's 2025 research is blunt: "user-centricity is a prerequisite for AI success."

### The confirm / reshape / veto triad

Research is allowed to do three things to your epic:

| Action | What it means |
|--------|---------------|
| **Confirm** | The bet is solid — plan with conviction |
| **Reshape** | Scope, priorities, or acceptance criteria need adjustment |
| **Veto** | You were about to extend a feature nobody uses |

### Research is broader than analytics

Usage behavior is the sharpest signal, but research includes:

- **Usage data** — what are users actually doing?
- **Competitive teardowns** — what already exists?
- **User interviews** — what do they say they need?
- **Support tickets** — where are the pain points?
- **Your own warehouse** — whatever holds your real signal

The skill is *connecting the agent to reality*, not any one tool. Use `plan-create-prd` to create a testable hypothesis, then point the agent at your analytics (PostHog, Amplitude, Mixpanel, or a SQL warehouse) to check it.

### What a good research pass produces

- **Evidence** folded into the epic — the data confirms (or denies) the problem
- **Scope decisions** — which parts of the idea are worth building
- **A success metric** — how you'll prove it worked later
- **Separate concerns flagged** — problems that belong in their own epic, not bolted onto this one

## Grounding in the codebase

Once you know *what* you're building, you need to know *how* to approach it. This is the eng-lead-level seat — the architecture calls the epic deliberately left open.

> The epic says **what** and **why**. Before you slice it or build it, someone has to decide **how to approach it**. Skip this seat and the agent makes these calls silently while coding, and the wrong ones get expensive.

### What grounding covers

The `plan-architecture` skill explores with you — it puts options on the table, tells you what it'd recommend and why, asks what it can't figure out, and you decide:

- **Approach** — the overall strategy (e.g., adapter pattern vs. bespoke per-case)
- **Stack & libraries** — what to use, what to reuse
- **Data model** — entities and relationships (the shape, not the columns)
- **Boundaries** — what's out of scope for v1
- **Integration points** — where this plugs into existing code

### Two-way vs one-way doors

Most calls are **two-way doors** — reversible, so decide and move on. The one or two that are **one-way** (expensive to undo) get extra care — and maybe a spike.

### Spikes for uncertain calls

When a call is uncertain *and* expensive to reverse, don't guess — **spike it.** Smallest thing you can build to learn, a timebox, and a rule for deciding.

The cheap, decisive questions — close them on the spot while the context is loaded, so what's left is real work, not unknowns.

### The architecture decision doc

The output is a **separate document linked to the epic** — the epic stays pure intent; the *how* lives in its own decision doc:

1. **Problem & goals** — one line from the epic
2. **Approaches considered** — what you evaluated and why one won
3. **Recommended approach** — the shape, not a task list
4. **Key decisions** — stack, data model, boundaries
5. **Missing pieces** — building blocks that don't exist yet
6. **Spikes** — what to test, with decision rules
7. **Open questions** — deferred, not hidden

## Slicing into tickets

An epic becomes tickets. But forget what "a ticket" means in traditional engineering — a tiny task, a couple of hours.

### Traditional tickets vs AI-scoped tickets

| Traditional | AI-scoped |
|-------------|-----------|
| Tiny task | Small-medium implementation *phase* |
| ~2 hours of work | ~10 subtasks, 500–1500 lines of change |
| Minimal tests | 20–50% of the change is tests |

**What doesn't shrink is the planning detail** — the plan still has to be context-rich and precise. It's the *scope* that grows, not the rigor.

### The real sizing unit: one testable concern

A ticket is sized right when it's **one testable concern** — easy to test, review, and prove on its own:

- **Test it** — clear success criteria, verifiable in one pass
- **Review it** — agents help review now, so the diff can run large, but not out of hand
- **Prove it** — results in one mergeable PR

### Why focused beats large

Just because an epic *fits* in the context window doesn't mean you should build it all in one go:

> Holding context and *using it well* are different things. A giant implementation in one window **rots**: partway through, the agent loses the thread, quality drops, returns diminish. A focused slice stays sharp start to finish.

### How to slice

Slice by:
- **Dependency** — what must be built before what
- **Concern** — separate features or modules
- **Slim e2e slice** — a thin cut all the way through that proves the whole flow, so the next loop can fatten it up

Whatever makes each ticket easiest to *prove*. Optimize for one-shot success.

### Plan just-in-time

Don't plan all the tickets up front. **Plan a ticket right before you build it.**

A dependent ticket waits for its dependency to be *implemented*, not just sliced. Building the first one teaches you things — the real shape of a seam, a name that changed — that should land in the next one's plan.

- **Independent tickets** can be planned now
- **Dependent tickets** wait their turn

### Per-ticket context

Each ticket names the doc sections, guides, and seams it needs:

> "source-adapter guide; seams: adapter interface; AC #2 and #4 from the epic doc"

Slicing time is when you know this — don't make execution time rediscover it.

## The full flow

```
Epic (the hypothesis)
  ↓ Research (confirm, reshape, or veto)
  ↓ Ground (architecture decisions)
  ↓ Slice (PIV-sized tickets with dependencies)
  ↓
Tickets → PIV Loop → Shipped PRs
```

## Key takeaways

- **An epic is a bet** — test it against reality before you plan
- **Research can confirm, reshape, or veto** — let real signal shape the scope
- **Grounding decides how to approach it** — architecture calls before any ticket exists
- **AI-scoped tickets are ~10x larger** than traditional tickets (same rigor, bigger scope)
- **One testable concern** is the sizing unit — easy to test, review, and prove
- **Plan just-in-time** — dependent tickets wait until their dependency is built
- **Small batches still matter** — DORA has a decade of evidence that they predict delivery performance

---

**Video references:**
- Course V6 — The Research Beat: Create Your Epic, Then Validate It with Real Usage
- Course V7 — Grounding the Epic in Your Codebase: the Architecture Decisions
- Course V8 — From Epic to Tickets: Slicing for PIV-Sized Work
