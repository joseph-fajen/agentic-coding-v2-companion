---
title: Archon
description: The workflow engine that holds the loop and does nothing else
---

import { Aside } from '@astrojs/starlight/components';

<Aside type="note" title="Prerequisites">
This doc assumes you've completed Phase 3 and built workflow automation using skills, scripts, or both. If you haven't automated multi-step workflows yet, start with [Headless / SDK / CI](/workflow/headless-sdk-ci/) first.
</Aside>

## When You Need This

You need Archon when your orchestrator skill is doing too many jobs at once — investigating, gating, digesting, talking to you, AND holding the loop. When the complexity of "what runs when" outgrows a single skill, it's time for a dedicated engine.

**Archon is a workflow engine for agentic coding workflows.** Unlike using a skill or script to orchestrate other skills, Archon provides a graph-based approach where your existing skills become nodes. You don't learn a new system — you express what you've already built in a format an engine can run.

## The Problem It Solves

Your orchestrator holds the loop while doing five other jobs — investigating, gating, digesting, talking to you. Holding the loop is a job, and it's doing five others.

**The thing built to hold loops and nothing else is an engine.** That's Archon.

## The Core Insight

> **You don't learn a new system. Everything you built this phase — the skills, the script, the hooks, the gates, the loops — can be expressed in Archon, and automated by it.**

A workflow, in Archon, is your skills and your scripts as nodes on a graph — and the graph is the structure you've been drawing by hand all act: what runs, what it depends on, what checks it, and where you stand.

## You Already Built the Parts

This is the key insight: **you didn't just learn five ways to automate — you hand-built the parts of a workflow engine.** Archon is those parts, load-bearing.

Everything in Archon maps to something you already know:

| What You Built | What It Becomes in Archon |
|----------------|---------------------------|
| Your fix script (deterministic checks, bounded loop) | A bash node |
| Your skills | Agent nodes with prompts |
| Fresh vs persistent context | A per-node setting |
| Receipts (artifact files) | Typed artifacts with declared outputs |
| Guards and batons | Edges and conditions (`depends_on`, `when`) |
| Gates and caps | Approval steps and bounded loops |
| Your CI trigger | The engine's triggers |
| Your orchestrator's digest | Run history, always there |

**You didn't just learn five ways to automate — you hand-built the parts of a workflow engine.** Archon is those parts, load-bearing.

## Why an Engine

Three properties, each one a limit you've already felt:

### 1. It Holds the Loop and Nothing Else

Your orchestrator holds the loop while investigating, gating, digesting, and talking to you. An engine holds the loop and does nothing else. That's not a bigger model or a better prompt — it's a different job description.

### 2. The Run Doesn't Live in a Chat Window

A run in a chat window dies with the window. An engine run lives in a database. It's persisted, it's resumable, and you can watch it. Every node, live, and still there tomorrow.

### 3. The Graph Owns the Task

Agent A hands to B, B to C, C back to A — and each one replans, because nobody owns the task. On a graph, ownership isn't a vibe — every step's inputs, outputs, and dependencies are written down. Nobody replans mid-hand-off, by construction.

---

## Gate Design: The Creative Act

The value here is **not determinism.** The creative act is designing checks against an outcome.

### What a Gate Really Is

> **A run finishing is not the work being right.** Those are two separate facts.

A gate stands between "the node completed" and anything public. It never asks the agent "did you succeed?" — because an agent that gives up still exits cleanly. **A gate checks the thing itself:** the report exists and validates, the tests really ran, the PR is really there.

The principle from V27 — a claim isn't evidence — except now it's not your discipline. It's the graph's.

### Three Kinds of Gate

| Gate Type | When to Use |
|-----------|-------------|
| **Script** | Tests pass, file exists, totals match — anything a command can check |
| **Agent** | Judgment call: is this review finding real? Does this plan decide the open questions? |
| **Human** | Public, expensive, or hard to undo |

A gate doesn't have to be a script. Sometimes the right check is **an agent, judging against an evidence bar you wrote.** The engine doesn't care which. It needs one thing: the verdict lands in a declared field it can act on.

### The Correction Loop

When the review says "not ready", the workflow loops back: fix the findings, prove it's green, and then — this is the part that matters — a **fresh review** checks the fix.

Every correction gets independently re-reviewed. The loop is bounded; meeting the gate stops it immediately; and if the bound runs out, the run **fails honestly.** Never an unreviewed final fix, and never a quiet failure.

### The Human Gate

> **Unattended is not a switch you flip. It's a position on a dial, and you move it one node at a time.**

Every workflow starts with you standing inside it. The steps you can prove, you hand to a script. The steps you can't, you keep. **Automate what a machine can prove. Keep yourself on the calls that need a person.**

Where to put a human gate: on the step that is public, or hard to undo. Everything before that is reversible.

---

## Workflow Shapes

Four shapes cover most of what you'll write:

### Advisory

Judge and stop, changing nothing. Investigate, plan, assess.

**"No" is a result.** An advisory that says "this isn't ready to build" completes successfully — with a report. It doesn't fail. It doesn't pretend. It answers.

### Delivery

Build, review, correct, validate, all the way to a reviewed, ready-to-merge PR.

Ready-to-merge — **never merged.** Merging stays yours.

### Interactive

The same graphs with a human gate in the loop. The workflow iterates, you answer at the seam.

### Entry Compositions

What happens once you have a few: a front door that grounds the work, a gate that authorizes the spend, and then one shared delivery tail behind it. Different doors — a bug, a dependency bump, a flaky test — same trusted tail.

Workflows compose out of workflows, when you have workflows to compose.

---

## Writing Workflows

### The Placement Test

Read every sentence of your prompt and ask:

| Question | Where It Belongs |
|----------|------------------|
| When? Whether? Again? | YAML (coordination) |
| How to think? What counts as evidence? What to produce? | Prompt (judgment) |

If your prompt is sequencing steps, that's the smell: there's a node boundary you haven't drawn yet.

### Five Authoring Decisions

1. **Placement** — Coordination in the YAML, judgment in the prompt
2. **One job per node** — And say what's NOT the job (negative scope keeps boundaries real)
3. **Two channels** — A declared field for the machine, an artifact for humans
4. **Judge by artifacts** — When a run ends, read what it left, don't ask "did it succeed?"
5. **See every gate red once** — Before you trust a gate's yes, make it say no

---

## The Iterate Habit

> **Build it loose. Run it. Fix what actually broke.**

Your first version should be simpler than feels safe, because every check you add before you've run it is a guess about how it'll fail. Run it once and you stop guessing — now you're looking at a real failure, and you add one check right where it happened.

### The Gate Ladder

When you need to add a check, ask:

1. **Can a script check it?** Tests pass, file exists, totals match — then a script decides
2. **Can't check mechanically?** Have an agent check it — fresh eyes, a standard you wrote
3. **Is it public, expensive, or hard to undo?** That's where **you** go

### The Two Callbacks

- **The gate is a teacher** — Take it out when it stops teaching you
- **Before you trust a gate's yes** — Make it say no once

---

## Workflows You Could Write

Some shapes worth stealing — every one of them a class of problem, plus the checks you already trust:

| Workflow | What It Does |
|----------|-------------|
| **Repo steward** | Triages incoming PRs against a direction doc |
| **CI first-responder** | Tells flake from real before you're awake |
| **Release hardening** | Your release checklist as gates instead of a wiki page |
| **Docs-drift repairer** | Diffs what docs claim against what code does |
| **Inbox processor** | For any item stream: tickets, applicants, ops queues |
| **Interactive planning partner** | Iterates with you at a gate |

Notice what each of those really is: a class of problem you already solve, plus the checks you already trust, written down.

---

## The Same Rule

> **A workflow moves into the engine the same way anything in this phase earned anything — when you've run it enough that its decisions stop surprising you.**

The engine is where trusted workflows graduate. It is not a shortcut past the trust.

---

## Key Takeaways

- **You already built the parts** — the engine maps to primitives you know
- **Three reasons for an engine:** holds only the loop, persists outside chat, graph owns the task
- **Gate design is the creative act** — not determinism, but designing checks against outcomes
- **Three kinds of gates:** script (checkable facts), agent (judgment), human (irreversible)
- **Four workflow shapes:** advisory, delivery, interactive, composed
- **Build loose, run, add machinery where it actually broke**
- **Before you trust a gate's yes, make it say no once**
- Workflows graduate to the engine when their decisions stop surprising you
