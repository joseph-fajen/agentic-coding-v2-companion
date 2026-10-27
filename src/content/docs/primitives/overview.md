---
title: The Five Primitives
description: The building blocks you compose to make your coding agent work your way
---

The five primitives are the **atoms** of agentic coding — the smallest meaningful pieces you compose into everything larger. Each one does a distinct job; together they let you build your **harness**.

> **What's a harness?** It's everything you wrap around a coding agent to make it work *your* way: your rules, your specialized workers, your tools, your processes, and your guarantees. Also called your **AI Layer**. The formula is simple: **Agent = Model + Harness.** The model is the easy part. The hard part is building the harness that makes the model useful on *your* codebase.

## The primitives at a glance

| Primitive | What It Is | Key Insight |
|-----------|------------|-------------|
| **Rules** | CLAUDE.md and steering documents | The highest-leverage file — read on every task, so keep it lean and true |
| **Subagents** | Isolated agents that do work and report back | Workers in separate contexts; you only see their final summary |
| **MCP / Tools** | External capability via Model Context Protocol | How the agent reaches *outside* the codebase to operate on real systems |
| **Skills** | On-demand processes loaded when triggered | Bank a process once; the agent runs it your way every time |
| **Hooks** | Guards that fire automatically | A rule asks; a hook guarantees — the agent can't talk its way past it |

## The order matters

The primitives have a **composition order**:

1. **Rules** — always-on principles and context
2. **Subagents** — isolated workers you dispatch
3. **MCP / Tools** — external capabilities
4. **Skills** — processes that compose the above
5. **Hooks** — deterministic guards that stand alone

Why this order? Each primitive can use the ones before it:
- A **skill** can drive subagents, call MCP tools, and reference rules
- A **subagent** can use MCP tools and read rules
- **Hooks** are the odd one out — nothing composes them; they fire on their own

Understanding this lets you put each piece of your harness in the right place — and tells you which pieces to learn first. If you're not sure where to start, follow the order: master rules before worrying about skills.

## It's all composable markdown

One thread runs through everything: **it's all markdown**. Rules, subagents, skills — they're all markdown files with some YAML frontmatter. You compose your harness by choosing where each piece of knowledge lives:

- **Always-on** in your rules file if you want it every session
- **On-demand** as a skill or reference if it's task-type-specific
- **Isolated** in a subagent if you want context protection

The format is the same; the *placement* is the lever.

## The universal arc

For every primitive, you follow the same three-step arc:

1. **Understand** how it works
2. **Build** a few yourself
3. **Build the thing that builds the thing** — a meta-skill or meta-agent that generates them your way

This is why going deep matters. A generic creator makes generic outputs. A custom one bakes in *your* conventions — your output shapes, your standards, your house style — so every new artifact comes out the way *you'd* structure it.

You can only instill patterns you actually understand.

## What you'll learn

Each primitive page covers:
- **What it is** and why it exists
- **How it works** — the mechanics
- **When to use it** — the judgment calls
- **How to make it yours** — the customization that beats generic

Start with any primitive that matters for your current work, or go through them in order to build a complete mental model.

## Key takeaways

- Five primitives compose into your harness (your AI Layer)
- They have a composition order — each can use the ones before it
- It's all markdown — the placement is what matters
- Understand first, then build, then build the builder

## See also

- [Phase 2: The Primitives](/phases/phase-2/) — where the course teaches each primitive
- [Coming from V1?](/v1-delta/overview/) — how the Five Primitives Framework relates to V1
