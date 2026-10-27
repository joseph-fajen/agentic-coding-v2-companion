---
title: What Still Applies
description: Core V1 concepts that remain central in V2
---

Not everything changed. These V1 concepts remain valid and central — V2 refines where they live and how they're taught, but the fundamentals persist.

## The PIV loop

**Plan → Implement → Validate** remains the execution model.

The loop is the same:

1. **Plan** — Understand the task, design the approach, identify risks
2. **Implement** — Write the code, make the changes
3. **Validate** — Verify the work meets requirements

V2 adds the **R-PIV** extension for complex tasks:

**Research/Reflect → Plan → Implement → Validate**

The research phase handles exploration, gathering context, and understanding unknowns before committing to a plan. Use it when the task requires understanding before acting.

## The validation pyramid

The five-layer validation stack remains your quality framework:

| Layer | What It Catches |
|-------|-----------------|
| **5. Human Review** | Logic errors, UX issues, edge cases |
| **4. Integration Tests** | Cross-component failures, API contracts |
| **3. Unit Tests** | Function-level bugs, regressions |
| **2. Type Checking** | Type mismatches, interface violations |
| **1. Syntax/Lint** | Syntax errors, style violations |

**The insight:** Each layer catches different things. Run them in order — cheaper layers first, expensive layers last. Don't skip layers.

In V2, validation often lives in skills and hooks:

- Skills encode validation workflows (`/review`, `/test`)
- PostToolUse hooks guarantee checks run after code changes
- CI pipelines run the full pyramid on every push

## Rules principles

These guidelines for your rules file remain valid:

### Day 1 onboarding

> Your rules file should be what a new developer needs on day 1 — not everything they'll ever need.

The test: if someone joined your team today, what would they need to know to start contributing? That's your rules file. Everything else is on-demand context.

### Principles over processes

Rules state *what* and *why*, not step-by-step *how*. The agent figures out the implementation.

**Good:** "Tests must pass before merge. Run `pytest tests/` to verify."

**Avoid:** "First run pytest, then check the output, then if it fails fix the tests, then run again..."

### Concise beats comprehensive

Every rule competes for attention. Research shows adherence drops as instructions pile up. Keep the always-on content lean.

**The cut test:** Would the agent do this anyway without you saying it? If yes, cut it.

### On-demand loading

Detail doesn't vanish — it loads when needed:

- **Path-scoped rules** (`.claude/rules/*.md`) load when touching matching files
- **Reference guides** load via tools or MCP
- **Skills** load only when triggered

## Layer 1 / Layer 2 mental model

The two-layer framing from V1 persists:

| Layer | What It Is |
|-------|------------|
| **Layer 1** | Your agentic system — the harness you've built |
| **Layer 2** | The code your system produces |

V2 adds the "harness" terminology but the concept is identical: you're engineering the thing that builds the thing. Your CLAUDE.md, skills, hooks, and subagents are Layer 1. The features they build are Layer 2.

The mantra: **"The harness matters more than the model."**

## MCP fundamentals

Model Context Protocol remains the same:

- Servers expose tools to the agent
- Configured in `.mcp.json`
- Tools extend what the agent can do

V2 adds the **skill + CLI pattern** as a lighter alternative, but MCP servers remain valid for complex integrations.

## Code review patterns

Your V1 code review habits transfer directly:

- Fresh context for reviewers (no implementation bias)
- Check against the validation pyramid
- Human review catches what automation misses

In V2, these patterns often live in review skills and CI workflows.

## System review patterns

Periodic system reviews — stepping back to assess your harness itself — remain important. Questions to ask:

- Is the rules file still accurate? (drift check)
- Are skills earning their place?
- Are hooks providing the guarantees they should?

## Your V1 companion site content

If you built a V1 companion site or reference, the conceptual content transfers. The six workflow stages, the PIV diagrams, the validation pyramid — these remain valid foundations organized differently in V2.

## What transfers without change

| Concept | Status in V2 |
|---------|--------------|
| PIV Loop | Unchanged |
| R-PIV extension | Unchanged |
| Validation Pyramid | Unchanged |
| Rules principles | Unchanged (refined location) |
| Layer 1/Layer 2 framing | Unchanged (+ "harness" term) |
| MCP fundamentals | Unchanged (+ skill+CLI alternative) |
| Code review patterns | Unchanged (+ skill/CI encoding) |

Next: [Migration Checklist](/v1-delta/migration-checklist/) — concrete steps to update your system.
