---
title: Greenfield planning
description: PRD and architecture before you write code
---

:::tip[TL;DR — When you start from scratch]
Greenfield means no codebase yet. Your PRD becomes your Layer 1 directly — the strategic doc scopes the work, architecture decisions seed your rules, and the agent builds from that foundation. Same R-PIV loop as brownfield, different on-ramp.
:::

## Overview

When you're starting fresh — no codebase, no constraints — the temptation is to just start prompting. But **the agent can only be as good as your plan.** Greenfield planning is how you give the agent something worth building.

This is one of three on-ramps into the same loop:

| On-ramp | Starting point | What you do |
|---------|---------------|-------------|
| **Greenfield** | Brand-new project, nothing exists | Layer 1 comes straight from a PRD you write |
| **Brownfield Type A** | Existing codebase, no AI Layer yet | Derive Layer 1 from the code (once) |
| **Brownfield Type B** | Existing codebase, AI Layer exists | Evolve it for the new epic |

Different starting context — **same loop.** Wherever you enter, you end up running R-PIV.

## When you need this

- Starting a new project from scratch
- Adding a major new subsystem to an existing project
- Any work where the *what* and *how* aren't already defined

## The PRD for AI coding

A PRD (Product Requirements Document) in agentic coding isn't a 50-page spec. It's the **strategic doc** that scopes the work — the minimum context the agent needs to make good decisions:

1. **What you're building** — the core functionality
2. **What you're NOT building** — explicit scope boundaries
3. **Key constraints** — tech stack, performance requirements, integrations
4. **Success criteria** — how you'll know it works

The strategic doc *scopes* the work — it doesn't become the plan. The plan comes later, per ticket, through the PIV loop.

## The Research beat on greenfield

Even on greenfield, the Research beat matters — but the signal is qualitative, not usage data:

- **User interviews** — what do they actually need?
- **Waitlist surveys** — what brought them here?
- **Competitor teardowns** — what already exists?
- **What you already know** from talking to the people you're building for

Research at its core is **understanding what you're building and why.** That spans user research, product-level planning, and architecture for the new product. What you learn there doesn't just feed this one plan — it can reshape your **Layer 1**: what goes in your rules, how your skills work, the automations you build.

Once you ship MVP and have real users, greenfield quietly becomes brownfield, and usage data becomes your weekly motion.

## Architecture before code

Before the agent writes line one, you need the eng-lead-level decisions:

- **The approach** — how you're going to build this
- **Stack & libraries** — what you're using and why
- **Core abstractions** — the main entities and their relationships
- **Directory structure** — where things live
- **Integration points** — how it connects to the outside world
- **Boundaries** — what's out of scope for v1

On greenfield there's no codebase to ground in — so `plan-architecture` explores the **solution space** instead: approaches, the web for current best practices, the stack from first principles. Same skill, same doc shape — it just leans on first principles where brownfield leans on existing code.

## The handoff to Layer 1

Your greenfield planning becomes your initial Layer 1 context:

- The PRD informs your `direction.md`
- Architecture decisions seed your `engineering.md`
- Constraints become rules in your CLAUDE.md
- Key integration patterns become on-demand context guides

This is the AI Layer you build once and evolve continuously — global rules, on-demand context, and skills. Phase 2 gives each component its own deep dive; here you just install the foundation.

## Key takeaways

- **Greenfield is one of three on-ramps** — same R-PIV loop, different starting point
- The strategic doc (PRD) scopes the work — it doesn't become the plan
- Research still matters on greenfield — it's just qualitative (interviews, surveys, competitor analysis)
- Architecture decisions are Layer 1 context — they persist and evolve
- What you learn in Research can reshape Layer 1, not just feed this one plan
- Greenfield is temporary — once you have users, you have usage data

---

**Video reference:** Course V2 — The Whole Loop: Strategic Doc → R-PIV → System Evolution
