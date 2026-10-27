---
title: Glossary
description: Key terms used throughout the Agentic Coding V2 course
---

Quick reference for terminology used in the V2 course and this companion site.

## Core Concepts

### Harness (AI Layer)

Everything you wrap around a coding agent to make it work your way: your rules, specialized workers, tools, processes, and guarantees. The formula is **Agent = Model + Harness**. The model is the easy part; the hard part is building the harness that makes the model useful on your codebase.

Also called your **AI Layer** or **Layer 1**.

### Layer 1 / Layer 2

Two levels of context in agentic coding:

| Layer | What It Is | Lifetime |
|-------|-----------|----------|
| **Layer 1** | Your harness — rules, skills, hooks, steering docs | Durable across tasks |
| **Layer 2** | Task-specific context — plans, feature specs, current work | Temporary per task |

Layer 1 is the system. Layer 2 is what the system operates on.

### PIV Loop

The core workflow: **Plan → Implement → Validate**. The base loop for shipping work.

### R-PIV Loop

Extended workflow: **Research → Plan → Implement → Validate**. Use R-PIV when the task requires exploration or understanding before you can plan. PIV is the base; Research is the optional extension for complex tasks.

### Inner Loop / Outer Loop

| Loop | Purpose | What It Does |
|------|---------|--------------|
| **Inner loop** | Ships work | Run PIV or R-PIV to complete a task |
| **Outer loop** | Improves the system | Fix rules, skills, hooks when the inner loop fails |

The inner loop ends with a merged PR. The outer loop ends with a better harness.

### Progressive Disclosure

Three-tier loading model that keeps token usage low:

1. **L1 (Metadata):** Always loaded (~100 tokens per skill) — just the description
2. **L2 (Body):** Loads on trigger (<5k tokens) — the full SKILL.md content
3. **L3 (References):** Loads only when read — bundled scripts and docs

The agent pays for context only when it needs it.

### Priming

Loading context into an agent before it starts work. In V2, priming happens through:
- Rules files (always-on context)
- Skills (on-demand context)
- References (fetched when needed)

Don't use subagents to prime your main agent — they have fresh context by design.

## The Five Primitives

### Rules

Durable context the agent reads on every task. Your `CLAUDE.md` or `AGENTS.md` file. Contains:
- Codebase map
- Ground rules (conventions)
- Runnable commands
- Agent steering

See: [Rules](/primitives/rules/)

### Subagents

Isolated agents dispatched for specific tasks. Fresh context per invocation — no context bleeding. You never see their work; you only see their report.

See: [Subagents](/primitives/subagents/)

### MCP / Tools

External capabilities via Model Context Protocol. The "USB-C for AI" — a standard interface for connecting tools. The **skill + CLI pattern** is a lighter alternative: skills orchestrate CLIs via bash.

See: [MCP / Tools](/primitives/mcp-tools/)

### Skills

Reusable, triggered procedures with structured format. Progressive disclosure keeps them efficient. Open standard that works across Claude Code, Codex, Cursor, and other agents.

See: [Skills](/primitives/skills/)

### Hooks

Deterministic guarantees that fire automatically. The key distinction: *"A rule asks the agent to behave; a hook guarantees it."* Exit code 2 blocks the action.

Events: PreToolUse, PostToolUse, SessionStart, Stop, SubagentStop, Notification.

See: [Hooks](/primitives/hooks/)

## Steering Documents

### direction.md

Answers: **What is this project?** Uses the IS / IS NOT pattern with named clauses (e.g., `§single-user`, `§not-financial`). Loaded for planning, triage, and architecture tasks.

See: [direction.md](/primitives/steering-direction/)

### engineering.md

Answers: **How do we judge code here?** Contains your objective function, code conventions, risk taxonomy, and "ready to merge" checklist. Loaded for implementation and review tasks.

See: [engineering.md](/primitives/steering-engineering/)

## Workflow Concepts

### Check → Trust → Automate

The Phase 3 discipline: you can't trust what you haven't checked, and you shouldn't automate what you don't trust. Run steps manually first, gain confidence, then compose into workflows.

### Fresh Context vs. Persistent Context

| Type | When To Use |
|------|-------------|
| **Fresh** | When you need independence — reviewers get clean context |
| **Persistent** | When you need memory — implementer keeps context across steps |

The `--resume` flag controls this in headless workflows.

### Skill + CLI Pattern

Skills don't replace CLIs — they orchestrate them:
- The CLI does deterministic work
- The skill provides reasoning + project context
- Agent runs the CLI via bash, sees only output

Custom checkers and helpers are the power move.

## File Conventions

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Claude Code's native rules file |
| `AGENTS.md` | Cross-tool standard rules file |
| `.claude/skills/` | Skill packages |
| `.claude/agents/` | Subagent definitions |
| `.claude/hooks/` | Hook scripts |
| `.claude/references/` | On-demand reference docs |
| `settings.json` | Hook configuration |
| `.mcp.json` | MCP server configuration |

## See Also

- [The Five Primitives](/primitives/overview/) — detailed coverage of each primitive
- [What Changed](/v1-delta/what-changed/) — V1 to V2 term mapping
