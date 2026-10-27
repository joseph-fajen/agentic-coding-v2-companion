---
title: "Phase 3: Improve & scale"
description: Make your system compound — fix the system instead of the code, then scale what's become reliable
---

Phase 3 is the **"Evolve"** stage — the discipline that makes your system compound. You've built the primitives; now you sharpen each piece, chain the pieces into workflows you can trust, and then scale that trustworthy system wider.

:::tip[What Phase 3 is for]
**This is where your system compounds.** You've built the pieces in Phases 1–2; now you automate and scale them. Phases 1–3 together form the complete core course.
:::

**9 videos** covering system evolution, workflow automation, and scaling.

## The two laws

Two principles organize everything in Phase 3:

1. **Fix the system, not the code.** When the agent gets something wrong, don't just patch the code and move on — fix the rule, the skill, the hook, so the *next* run catches it for you. Patch the code, you fixed one thing. Fix the system, you fixed it **forever**.

2. **Reliability earns autonomy.** You only automate and scale what you've made trustworthy. The review gate stays the whole way through. Autonomy is earned per-piece, where you've watched it work enough times to trust it.

## Two acts

Phase 3 delivers these laws in two acts:

### Act 1: improve your system

Sharpen each piece, chain them, measure them. Every video = improve a real piece of *your own* system.

| Focus | What you do |
|-------|-------------|
| **System evolution** | The outer loop — run `/insights`, see how you use the agent, and update the layer so it can't slip the same way twice |
| **Make your ship step yours** | Tune commit and PR conventions — write them down once, three layers enforce them (skills read the doc, regex asserts guard the form, judge rubric grades the substance) |
| **The issue-fixer** | Automate the cleanest hand-off: a well-scoped bug → investigate → implement → commit → PR → review. Starts gated, closes to hands-off as trust grows |
| **Automate your whole loop** | Chain plan → implement → validate → review → commit → (self-fix) → PR as one workflow, with hooks as the gates |

The key mechanism: **conventions written down once, enforced by three layers.** The skill stays general and portable; what's specific to the project lives in the doc, travels with the repo, and is inherited by anyone who clones it.

### Act 2: scale your system

The reliable system from Act 1, run wider. A ladder of *how* you run it:

| Rung | What it unlocks |
|------|-----------------|
| **Parallel (worktrees)** | Run compositions side by side, isolated — PIV loops on multiple tickets at once |
| **Headless / Non-interactive** | `claude -p` and peers — workflows that run without you in the window |
| **Archon** | The DAG abstraction — skill-chaining + scheduling + worktree isolation + parallel orchestration you don't hand-code |

:::note
**AI-in-CI** (running workflows in CI pipelines) moved to Phase 4 as of July 2026. Phase 3 covers the foundations; Phase 4 extends to team-scale and CI automation.
:::

**Cost discipline runs underneath the whole act.** Every rung (parallel, headless, autonomous) multiplies tokens; unmanaged, it bites. The controls: per-run/per-agent budgets + caps, model routing (cheap model for mechanical steps, capable for the hard ones), prompt caching. Cost discipline is what makes autonomy affordable.

## The human/agent division

The spine is "improve the system"; this map says *which pieces* to sharpen first. The engineer's leverage concentrates at the **ends** (judgment); the agent owns the **middle** (mechanical).

| Step | Agent's job | Your job |
|------|-------------|----------|
| **Plan** | Research, draft, ground in codebase | The judgment — what to build, the approach, scope, tradeoffs. Highest leverage; a wrong plan won't fix-forward |
| **Implement** | Write the code to the plan | Mostly hands-off (you front-loaded the judgment into the plan) |
| **Validate** | Run lint/types/tests, iterate to green | Define validation in the plan; otherwise hands-off |
| **Review** | Technical first-pass sweep + route your attention | The final judgment — check the files the agent flags |

Engineering moved upstream — and to review. Act 1 sharpens the ends first (the plan and the review), then automates the middle.

## The compounding payoff

Here's what Phase 3 delivers:

- **Deviation → update → catch it next time.** Every slip improves the system permanently.
- **Automation earned, not assumed.** You watched it work; now you let it run.
- **Scaling without chaos.** Parallel loops, headless runs, CI integration — all built on trust, not hope.

The review gate never disappears. What changes is how much you need to *do* at that gate — the system does more of the work, and the work it hands you is smaller and better-supported.

## What's next

Phase 3 completes the core course. [Phase 4](/phases/phase-4/) is advanced and optional — deep dives on teams, orchestration, AI-native codebases, and more. The system you built in Phases 1–3 is complete; Phase 4 extends it for specific contexts.

## See also

- [Workflow Primitives](/workflow/overview/) — deep dives on headless, SDK, CI, and Archon
- [Hooks](/primitives/hooks/) — the guarantees that make automation safe
