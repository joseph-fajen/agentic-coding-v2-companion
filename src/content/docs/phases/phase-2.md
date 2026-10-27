---
title: "Phase 2: The primitives"
description: The five building blocks every agentic system is made of — and how to shape each one to your work
---

Phase 2 is the **"Understand"** stage — you go under the hood of the system you built in Phase 1 and learn the **five primitives** it's made of. By the end, you won't just *use* these building blocks — you'll teach your agent to **build them for you, your way.**

**Weeks 4–5 · Videos V12–V23**

## What you'll walk away with

- **The harness framework in your head:** Agent = Model + Harness. The harness is everything you wrap around the model — and in 2026, it matters more than the model itself.
- **Deep understanding of all five primitives:** Rules, Subagents, MCP/Tools, Skills, Hooks — what each is, how to build it, and how to make it *yours*.
- **The compounding insight:** once you understand a primitive and form your own opinions about it, you can teach your agent to *author that primitive for you*. A skill that writes skills. A harness that improves itself.

## The Phase 2 thesis

Your coding agent is only as good as the **harness** around it. That harness is built from five primitives: rules, subagents, MCP/tools, skills, hooks. Phase 2 teaches each one deeply — not just so you can use it, but so you can **encode your preferences** and teach your agent to build more harness for you.

Understanding the primitives is the prerequisite to *engineering* — and eventually *automating* — the system around them. You can't compose what you don't understand.

## The five primitives

The primitives follow a **composition order** — each one builds on the ones before it:

| Primitive | What it is | Why this order |
|-----------|------------|----------------|
| **Rules** | The durable context that teaches the agent your project | Everything reads them — they come first |
| **Subagents** | Specialists you hand work to, in their own clean context | Skills can drive subagents, so learn them first |
| **MCP / Tools** | How the agent reaches real systems beyond text | Skills can call tools, so learn them first |
| **Skills** | Reusable, packaged procedures — your repeatable processes captured | Skills compose the above; hooks don't compose skills |
| **Hooks** | Deterministic guarantees wired into the loop | They fire on their own, enforcing what must always (or never) happen |

See the [Five primitives](/primitives/overview/) section for deep dives on each.

## The videos

| # | Title | Focus |
|---|-------|-------|
| **V12** | The primitives of agentic engineering | The map: what a harness is, the five primitives, the composition order |
| **V13** | The rules primitive | Rules deep dive — what earns always-on, what gets pushed to on-demand |
| **V14** | Global rules exercise | Hands-on: shape your rules file to your project |
| **V15** | The subagent primitive | Delegation + isolated context — when and how to use specialists |
| **V16** | Subagents exercise | Hands-on: configure subagents for your work |
| **V17** | The MCP primitive | Tools and MCP servers — extending what the agent can do |
| **V18** | MCP exercise | Hands-on: connect tools to your workflow |
| **V19** | The skills primitive | Packaged procedures — make your planner yours |
| **V20** | Skills exercise | Hands-on: build and customize skills |
| **V21** | The hooks primitive | Deterministic guarantees — what must always, or never, happen |
| **V22** | Hooks exercise | Hands-on: wire in your guarantees |
| **V23** | Outro: from primitives to composing your system | Bridge to Phase 3 — the honest frame and what's next |

Each primitive gets a **teach** video and a hands-on **exercise** on your own project.

**Next step:** [Watch V12 — The primitives of agentic engineering](https://www.skool.com/dynamous) or dive into the [Rules primitive](/primitives/rules/) reference.

## The keystone insight

Here's the idea the whole phase hinges on:

> **Understand a primitive → form your preferences → delegate the authoring.**

Once your preferences are codified, you can write a **skill that writes skills** — and one that writes hooks, and subagents. You can point your agent at your own harness and ask *what's missing* — and it knows, because it understands the same primitives you do, and it can build the piece that fills the gap.

This is what **"build the thing that builds the thing"** means. Your harness stops being something you hand-write and becomes something that helps build itself. Every primitive you add makes the next one cheaper. The system compounds.

## The honest frame

By the end of Phase 2, you have the **building blocks** — not a finished system that's "yours and done." This is the *beginning*, not the end. Ownership grows through use: you build, you update, you try things, you keep what works and cut what doesn't.

A system nobody improves is a system that quietly rots.

## What's next

[Phase 3](/phases/phase-3/) is where you make it compound. The spine: **fix the system, not the code**. When the agent gets something wrong, don't just patch the code and move on — fix the rule, the skill, the hook, so the *next* run catches it for you.

Phase 3 has two jobs:
1. **Improve** the pieces — feed every deviation back into the system, then automate what's become reliable
2. **Scale** them — parallel, remote, team, CI

You've built the parts. Phase 3 makes them compound.
