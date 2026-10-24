---
title: Rules
description: The highest-leverage file in your harness — your rules file steers the agent on every task
---

Your rules file is the highest-leverage file in your entire harness. It's the one thing the agent reads on **every** task — and it's the easiest one to wreck. Most people treat it as a junk drawer, pile in everything they can think of, and end up with an agent that follows *fewer* of their rules, not more.

## The Core Insight

**Every rule you add is a tax on the rules you already have.** Research shows that as you pile on simultaneous instructions, the share the model actually follows drops — one study found roughly 44% adherence at just ten instructions at once. Lean isn't tidiness; it's how many of your rules actually get followed.

## AGENTS.md vs CLAUDE.md

Two filenames, one job:

| File | Description |
|------|-------------|
| **AGENTS.md** | The open, cross-tool standard — stewarded by the Linux Foundation, read by dozens of agents across tens of thousands of repos |
| **CLAUDE.md** | Claude's native file — Claude Code reads this automatically |

They're the **same job** with ~90% identical content. Multi-tool team? Put the shared stuff in AGENTS.md so every agent reads it, and keep a thin CLAUDE.md only for Claude-specific bits like `@`-imports.

### Nesting Behavior

The two formats nest differently (relevant for larger codebases):

- **AGENTS.md** uses **nearest-file-wins**: the agent walks up from the file it's editing and the closest file takes precedence
- **CLAUDE.md** uses **concatenation**: Claude Code reads every CLAUDE.md from the repo root down to where you're working and merges them

Most projects never need nested rules files — they're for when the codebase gets big enough to need per-area conventions.

## What Earns an Always-On Slot

Four kinds of content earn space in your rules file:

### 1. A Codebase Map

A file tree of the code that matters — each directory and file with one short line explaining *what it is and why it's there*.

This is the highest-leverage thing in the file. It's how the agent navigates your repo without grepping around blind. README is for humans; this map is for the agent.

### 2. Ground Rules

The specific conventions this project follows that the agent won't honor on its own — your type-safety bar, schema/naming conventions, testing strategy, logging approach, git workflow, error philosophy.

This isn't a checklist of sections every rules file must have. It's the **delta** — what *your* project needs that the agent *wouldn't do by default*. The test: "would it do this anyway?" If yes, cut it. If it keeps getting it wrong, encode it.

### 3. Runnable Commands

The bash commands you want the agent to run itself — your linter, type-checker, test runner, the CLIs for your tooling. Not slash-commands (those are skills) — the **actual bash commands** with the real flags.

```markdown
## Commands

- **Lint:** `ruff check --fix`
- **Type-check:** `mypy src/`
- **Test:** `pytest tests/ -q`
- **Dev server:** `uvicorn app.main:app --reload`
```

Copy-pasteable commands beat vague descriptions every time. The agent can *run* a command and confirm the result; it can't verify a sentence.

### 4. Agent Steering

How you want the agent to *operate* here — plan before non-trivial work, ask when ambiguous instead of guessing, your branching strategy, the convention it always forgets.

This is the part you can't derive from the code — you have to state it. It's where you encode what the agent gets wrong on *your* project until you tell it.

## The Cut-vs-Keep Rule

> **If the agent would do it anyway without you saying it, cut it. If it encodes a choice specific to *this* project, keep it — and state the choice, not the slogan.**

Examples to **cut**:
- "KISS", "DRY", "write clean code"
- "Type safety is critical"
- Generic best practices the model already knows

Examples to **keep**:
- "Derive types with `z.infer`, never hand-write parallel interfaces"
- "Git is first-class — a worktree per task"
- "Never touch `.env` or commit secrets"

Negative rules ("never do X") pull as much weight as positive ones, and emphasis markers like **IMPORTANT** or **NEVER** measurably raise adherence — spend them on the few rules that truly matter.

## The Four Destinations

For every line in a rules file, ask two questions:

1. **Constant, or task-specific?** → Task-specific content isn't a rule at all
2. **Needed every session?** → Yes means always-on; no means on-demand

These sort every line into **four destinations**:

| Destination | Description |
|-------------|-------------|
| **Keep always-on** | The map, ground rules, commands, agent-steering you always want |
| **Push to on-demand** | Stable but task-type-specific references or skills, loaded only when needed |
| **Move to a plan** | Content about one specific task or feature |
| **Delete** | Redundant or slogan content the model already follows |

## On-Demand Context

The detail you cut doesn't vanish — it loads on demand. Three ways to achieve this:

### Path-Scoped Rules

`.claude/rules/*.md` files with a `paths:` glob that only load when the agent touches matching files:

```yaml
---
paths:
  - "src/frontend/**"
---
# Frontend Conventions
Use React function components...
```

Your frontend conventions load only when working in the frontend; your migration rules only during migrations.

### On-Demand Reference Guides

Documents the rules *point to* rather than inline — pulled in only when relevant. A reference can be a local markdown file, a Confluence page, your wiki, or API docs. The agent fetches it on demand via a tool or MCP server.

### Skills (Progressive Disclosure)

The real mechanism — only a one-line description is always on; the body loads when the skill triggers; bundled files load only if read. Skills are covered in their own section.

## Structure as You Grow

| Project Size | Approach |
|--------------|----------|
| **Small** | One file — everything in one place, easy to scan |
| **Growing** | Modular — split sections into files the root pulls in via `@`-imports |
| **Large/Monorepo** | Package-level rules files — each folder carries its own map + conventions |

## Keeping It True: Drift

> **A rules file that lies to your agent is worse than no rules at all.**

The map is the first thing to rot when code moves. A stale map sends the agent to the wrong place confidently.

The fix is automation: before any merge, check the rules file against what changed and flag drift. Fold it into your code review — when something the rules describe changes, the rules get updated *in the same pass*, before you merge. This is the `rules-check-drift` discipline.

## Composition: It's All Markdown

The key learning that ties rules to every other primitive:

> Rules, references, and skills are **all just markdown** the agent loads when it needs them.

A steering principle, a naming convention, a git-workflow note — *you choose where it lives*: always-on in the rules if you always want it, an on-demand reference if it's situational, a skill if it's a procedure. You **compose** your harness out of markdown and load each piece at the right time.

## Key Takeaways

- Your rules file is read on every task — keep it lean and true
- Four things earn always-on: map, ground rules, commands, agent steering
- Everything else loads on demand
- Cut slogans; keep specific conventions
- Check for drift before every merge
- AGENTS.md and CLAUDE.md are the same job — the skill transfers
