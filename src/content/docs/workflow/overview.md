---
title: Workflow primitives
description: Check your system, trust the parts that work, and automate what you trust
---

Writing code is no longer the hard part. So the engineers who matter are the ones who keep improving the **system** that writes it. That's what Phase 3 of the course is about — and the order that makes it work: **check it, trust it, automate it.**

:::note[Is this for you?]
- **Read this when** you've shipped a few tickets through the loop and want the agent to need less of you.
- **Skip for now if** you're still on your first project. Phase 1 comes first.

The pages in this section, by when you'll need them:

- **Starting a new project:** [Greenfield planning](/workflow/greenfield-planning/) (Phase 1)
- **Adding a feature to existing code:** [Epic to tickets](/workflow/epic-to-tickets/) (Phase 1)
- **Several independent tickets at once:** [Parallel worktrees](/workflow/parallel-worktrees/) (Phase 1)
- **Running workflows without you:** [Headless / SDK / CI](/workflow/headless-sdk-ci/) (Phase 3)
- **A workflow engine:** [Archon](/workflow/archon/), once headless runs are working
- **Working with teammates:** [Running this as a team](/workflow/teams/)
:::

## The core insight

> **You can't trust what you haven't checked. And you should never automate what you don't trust. So we do them in that order.**

This rules out automating something because it "felt fine the last few times." Trust here is earned by checking — and then by repetition under that checking. Repetition alone just breeds comfort.

## Two loops

There are two loops in agentic coding:

| Loop | What it does | The workflow |
|------|-------------|--------------|
| **Inner loop** | Ships the work | Plan → Implement → Validate (PIV) — or Research → PIV for complex tasks |
| **Outer loop** | Improves the system that ships the work | Fix rules, skills, hooks — not the code |

The **inner loop** is your day-to-day workflow: **Plan → Implement → Validate** (PIV). For complex tasks that need exploration first, you extend it to **Research → Plan → Implement → Validate** (R-PIV). Either way, the loop ends with a merged pull request.

The **outer loop** fires when something in the inner loop goes wrong — the agent misunderstands, skips your conventions, does the thing you keep telling it not to. You step **out**. Not to fix the code. To fix **the system that produced the code**, so the next run doesn't do it again.

That's the outer loop. And it's the difference between an AI layer that stays the same shape all year, and one that gets harder to break every week.

### Two ways in

You enter the outer loop two ways, and the difference is smaller than you'd think — it's **what you point it at**:

| Entry | What you point at | What it asks |
|-------|------------------|--------------|
| **Reactive** | One run's artifacts (the plan, the code diff, the test output, the review report) | "What should change so that doesn't happen again?" |
| **Proactive** | Weeks of runs | "What keeps costing me?" |

Point it at **one run's artifacts** — the plan, the diff, the test output — and you're asking about a specific problem. Point it at **weeks of logs** and you're looking for patterns — the things you keep doing by hand that should become skills, rules, or hooks.

## The one-sentence version

The smallest version of the outer loop is one sentence, typed into your agent:

> **"You just did X. What could we change in the AI layer so that doesn't happen again?"**

That's the whole concept. Everything else — scans, reports, opportunity analysis — is making that question repeatable so you're not relying on remembering to ask.

**The guard:** Your agent will always find something to suggest — that's what it does. Not every mistake is a system gap. Sometimes the answer is "nothing; that was a one-off." If you encode a rule for every bad run, in three months you'll have a rules file nobody can read and an agent that follows none of it. The judgment about what's worth encoding stays yours.

## The human/agent map

Where do you stand in this loop? At the ends.

| Step | Who owns it |
|------|-------------|
| **Plan** | You — judgment about what to build |
| **Implement** | The agent — mechanical execution |
| **Validate** | The agent — mechanical verification |
| **Review** | You — judgment about whether it's right |

The agent owns the middle (mechanical work). You own the ends (judgment calls). Engineering moved upstream — to planning and review. That's where your leverage sits.

## The road through Phase 3

Phase 3 has two acts:

### Act 1: improve

Audit your own system. Not the code — the system. How you actually work, where it keeps slipping, which parts have earned your confidence.

This is the "check" phase. You're finding out what you trust and what you don't.

### Act 2: scale

Turn the parts you trust into **workflows** — and build them multiple ways, because this is the one piece of the toolkit that hasn't settled on a single shape yet:

| Method | What says go |
|--------|--------------|
| [Headless scripts](/workflow/headless-sdk-ci/#headless-scripts) | A script |
| [The SDK](/workflow/headless-sdk-ci/#the-sdk) | Your program |
| [Hooks](/workflow/headless-sdk-ci/#hooks) | An event |
| [CI](/workflow/headless-sdk-ci/#ci-pipelines) | A repository trigger |
| [Orchestrator](/workflow/headless-sdk-ci/#orchestration) | A skill that runs the others |
| [Archon](/workflow/archon/) | An engine with a graph |

Then you hand the whole thing to a workflow engine.

**Improve it until you trust it; scale it because you do.**

## What's worth automating

Before diving into the how: not everything should be automated.

> **You don't automate a task. You automate a class of problems** — a shape that repeats, where you already know what a good answer looks like.

**The test:** Can you describe how you do it, without knowing the specifics of the next one? If you can, it's a class, and it's ready. If you can't, you haven't solved it yet — and automating it just makes the guessing faster.

A class doesn't have to be tidy CRUD work. Bugs are all different — but *investigating* a bug has a shape every time. **The process can be a class even when the problem isn't.**

## It's all just instructions

The mental model that makes everything in this section cheaper to understand:

> **A skill, an agent file, your CLAUDE.md, an AGENTS.md — they're all just markdown files full of instructions. What's different is how they get loaded.**

The content is just instructions. The format buys you loading and scoping: which tools this thing is allowed to use, which model it runs on, and the description that lets your agent reach for it on its own without you naming it.

If they're all just instructions, then composing them isn't systems integration. **It's writing.** You're not wiring tools together — you're writing another instruction that mentions the first two. That's the entire act.

## Where this goes

- **[Headless / SDK / CI](/workflow/headless-sdk-ci/)** — Five ways to run your workflow without you pressing go
- **[Archon](/workflow/archon/)** — The workflow engine that holds the loop

## Key takeaways

- **Check, trust, automate** — in that order. You can't trust what you haven't checked
- Two loops: inner ships the work, outer improves the system that ships it
- Enter the outer loop reactively (one run) or proactively (weeks of logs)
- Your leverage is at the ends: planning and review
- Automate classes of problems, not individual tasks
- Everything is instructions — composing is writing

## See also

- [Phase 3: improve & scale](/phases/phase-3/) — where the course teaches these concepts
- [Hooks](/primitives/hooks/) — the guarantees that make automation safe
- [Skills](/primitives/skills/) — the processes you chain into workflows
