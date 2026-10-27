---
title: "Phase 4: Going Further"
description: Advanced and optional — deep dives for teams, orchestration, and AI-native codebases
---

Phase 4 is the **advanced and optional** stage — a set of deep-dive acts for specific contexts. The core course (Phases 1–3) is complete on its own; Phase 4 extends it for teams, advanced orchestration, and production-scale patterns.

**Act-based and non-ending.** Phase 4 is organized as independent acts, 1–5 videos each, deliberately extensible. New acts get appended as the field evolves — the phase doesn't build to a finale; it accumulates.

## The shape principle

**Phases 1–3 = the core, complete system.** A solo developer finishing Phase 3 has everything they need.

**Phase 4 = advanced/optional.** Content that doesn't apply to everyone — team coordination, deep orchestration, AI-native architecture, production automation patterns.

## The acts

### Act: teams

**AI coding agents as a team standard.** The same building blocks a person owns, a team can own.

| Topic | What You Learn |
|-------|----------------|
| **Shared Scopes** | The three levels of the shared layer — org, repo, personal |
| **The Team-Standard Mechanism** | Conventions written once in a repo doc, inherited on clone, enforced by skills and hooks |
| **Ownership and Adoption** | How teams evolve their shared layer over time |

The mechanism from Phase 3 (conventions doc → skills read it → regex guards it → rubric grades it) scales to teams. What's specific to the team lives in the doc; anyone who clones the repo inherits the standards.

### Act: orchestration deep dive

**Advanced patterns for running complex workflows.** When to deepen the orchestrator vs when to hand the loop to Archon.

| Topic | What You Learn |
|-------|----------------|
| **Worktree-Isolated Workstreams** | Multiple independent loops, merge queues ordered by conflict risk |
| **Run Files and Resume** | Durable execution — resume after a dead session |
| **Agent Teams** | Multiple agents coordinating on larger work |
| **Spike Workstreams** | Exploratory work that might get thrown away |

### Act: AI-native codebases

**Designing and migrating codebases for AI-first development.**

| Topic | What You Learn |
|-------|----------------|
| **AI-Native Design** | Codebase patterns that make agent work more reliable |
| **Migration Paths** | How to evolve an existing codebase toward AI-native patterns |
| **Context Curation at Scale** | Managing what the agent sees in large codebases |
| **Per-Feature AI Layers** | Decomposition strategies for complex projects |

## Future acts

Phase 4 is designed to grow. The course includes standing intake mechanisms:

- **Ideas card** — topics the community wants covered
- **Shared exercises** — real student workflows that become teaching material
- **Course channel** — the open door for what's missing

Workshops often arrive first; an act can double as a recorded workshop. The structure keeps the core course stable while allowing depth to accumulate.

## What makes Phase 4 different

| Core Course (P1–P3) | Phase 4 |
|---------------------|---------|
| Everyone needs it | Context-dependent |
| Sequential — each phase builds on the last | Independent acts — take what applies |
| Covers the complete system | Deep dives on specific concerns |
| Has a completion milestone | Non-ending — grows over time |

## Getting started with Phase 4

Pick the act that matches your context:

- **Working with a team?** → Start with Teams
- **Running complex workflows?** → Start with Orchestration
- **Designing or migrating a codebase?** → Start with AI-Native Codebases

You don't need to complete Phase 4 — it's a reference library for when you need depth.
