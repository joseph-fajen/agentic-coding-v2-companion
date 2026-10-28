---
title: Glossary
description: Key terms used throughout the Agentic Coding V2 course
---

Quick reference for terminology used in the V2 course and this companion site.

:::tip[Start here]
**If you're new**, learn these terms first in this order:
1. **Harness / AI layer** — what you build around the model
2. **PIV loop** — the core workflow (Plan → Implement → Validate)
3. **The five primitives** — Rules, Subagents, MCP/Tools, Skills, Hooks
4. **Layer 1 / Layer 2** — durable vs task-specific context

Everything else builds on these.

**Not a developer?** Read [Basics](#basics) first, then see [Start here if you're not a developer](/start-here/).
:::

## Basics

Everyday developer terms the rest of the site assumes.

| Term | In plain English |
|------|------------------|
| **Terminal** | The text window where you type commands. Terminal on Mac, PowerShell on Windows. |
| **CLI** (command-line interface) | A program you run by typing commands in the terminal. Claude Code is one. |
| **Repo** (repository) | A project folder whose history is tracked by git |
| **Git** | Software that saves snapshots of your project so you can go back to any earlier version |
| **Commit** | One saved snapshot, with a message describing what changed |
| **Branch** | A separate line of work, so changes in progress don't touch the working version |
| **PR** (pull request) | A proposed change from a branch, reviewed before it's merged into the main version |
| **GitHub** | A website that hosts git repos and handles pull requests |
| **Markdown** | Plain text with light formatting, like `# Heading` and `**bold**`. Rules, skills and steering docs are all markdown files (`.md`). |
| **YAML frontmatter** | A short block of `key: value` settings between `---` lines at the top of a markdown file. Skills use it for their name and description. |
| **Token** | The unit AI models read and bill by, roughly three-quarters of a word |
| **Context window** | How much text the agent can hold in mind at once. Everything loaded, from rules to files to chat, uses it up. |
| **CI** (continuous integration) | Checks that run automatically on a server whenever code is pushed, such as tests and linting |
| **`.env` file** | A file holding passwords and API keys, kept out of git so secrets never get shared |


## Core concepts

### Harness (AI layer)

Everything you wrap around a coding agent to make it work your way: your rules, specialized workers, tools, processes, and guarantees. The formula is **Agent = Model + Harness**. The model is the easy part; the hard part is building the harness that makes the model useful on your codebase.

Also called your **AI Layer** or **Layer 1**.

### Layer 1 / Layer 2

Two levels of context in agentic coding:

| Layer | What it is | Lifetime |
|-------|-----------|----------|
| **Layer 1** | Your harness — rules, skills, hooks, steering docs | Durable across tasks |
| **Layer 2** | Task-specific context — plans, feature specs, current work | Temporary per task |

Layer 1 is the system. Layer 2 is what the system operates on.

### PIV loop

The core workflow: **Plan → Implement → Validate**. The base loop for shipping work.

### R-PIV loop

Extended workflow: **Research → Plan → Implement → Validate**. Use R-PIV when the task requires exploration or understanding before you can plan. PIV is the base; Research is the optional extension for complex tasks.

### Inner loop / outer loop

| Loop | Purpose | What it does |
|------|---------|--------------|
| **Inner loop** | Ships work | Run PIV or R-PIV to complete a task |
| **Outer loop** | Improves the system | Fix rules, skills, hooks when the inner loop fails |

The inner loop ends with a merged PR. The outer loop ends with a better harness.

### Progressive disclosure

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

## The five primitives

### Rules

Durable context the agent reads on every task. Your `CLAUDE.md` or `AGENTS.md` file: a plain markdown file at the root of your project, which you write and keep in git. Contains:
- Codebase map
- Ground rules (conventions)
- Runnable commands
- Agent steering

See: [Rules](/primitives/rules/)

### Subagents

Isolated agents dispatched for specific tasks. Fresh context per invocation — no context bleeding. You never see their work; you only see their report.

See: [Subagents](/primitives/subagents/)

### MCP / tools

External capabilities via Model Context Protocol. The "USB-C for AI" — a standard interface for connecting tools. The **skill + CLI pattern** is a lighter alternative: skills orchestrate CLIs via bash.

See: [MCP / tools](/primitives/mcp-tools/)

### Skills

Reusable, triggered procedures with structured format. Progressive disclosure keeps them efficient. Open standard that works across Claude Code, Codex, Cursor, and other agents.

See: [Skills](/primitives/skills/)

### Hooks

Deterministic guarantees that fire automatically. The key distinction: *"A rule asks the agent to behave; a hook guarantees it."* Exit code 2 blocks the action.

Events: PreToolUse, PostToolUse, SessionStart, Stop, SubagentStop, Notification.

See: [Hooks](/primitives/hooks/)

## Steering documents

### direction.md

Answers: **What is this project?** Uses the IS / IS NOT pattern with named clauses (e.g., `§single-user`, `§not-financial`). Loaded for planning, triage, and architecture tasks.

See: [direction.md](/steering/direction/)

### engineering.md

Answers: **How do we judge code here?** Contains your objective function, code conventions, risk taxonomy, and "ready to merge" checklist. Loaded for implementation and review tasks.

See: [engineering.md](/steering/engineering/)

## Workflow concepts

### PRD (product requirements document)

The strategic doc for a new project: what you're building, for whom, and why. In agentic coding it's short, the minimum context the agent needs to make good decisions, not a 50-page spec. Its scope feeds `direction.md`.

See: [Greenfield planning](/workflow/greenfield-planning/)

### Greenfield / brownfield

**Greenfield** is a brand-new project with no code yet, where your Layer 1 comes straight from a PRD. **Brownfield** is adding to software that already exists.

### Epic

A chunk of work too big for one loop, such as a new feature. In V2 an epic is treated as a hypothesis: research it, ground it in the codebase, then slice it into tickets.

See: [Epic to tickets](/workflow/epic-to-tickets/)

### Ticket

One piece of work sized for a single PIV loop: about 10 subtasks and 500–1500 lines of change. Each ticket is planned just before it's built.

### Worktree

A separate working copy of your repo on its own branch, sharing one git history. Lets you run several PIV loops in parallel without them colliding.

See: [Parallel worktrees](/workflow/parallel-worktrees/)

### Headless

Running the agent without you in the window, from a script (`claude -p`), a program (the SDK) or CI.

See: [Headless / SDK / CI](/workflow/headless-sdk-ci/)

### Slash command

A skill or command you run by typing `/name` in Claude Code, such as `/piv-validate`. Older V1-style commands in `.claude/commands/` still work.

### Workflow engine (Archon)

A tool that holds a multi-step workflow (the steps, gates and retry loops) so your skills don't have to. The course uses **Archon**, an open-source engine from the Dynamous community, as its example. Archon describes workflows as a **DAG** (directed acyclic graph): steps connected in an order that never loops back on itself.

See: [Archon](/workflow/archon/)

### Check → trust → automate

The Phase 3 discipline: you can't trust what you haven't checked, and you shouldn't automate what you don't trust. Run steps manually first, gain confidence, then compose into workflows.

### Fresh context vs. persistent context

| Type | When to use |
|------|-------------|
| **Fresh** | When you need independence — reviewers get clean context |
| **Persistent** | When you need memory — implementer keeps context across steps |

The `--resume` flag controls this in headless workflows.

### Skill + CLI pattern

Skills don't replace CLIs — they orchestrate them:
- The CLI does deterministic work
- The skill provides reasoning + project context
- Agent runs the CLI via bash, sees only output

Custom checkers and helpers are the power move.

## File conventions

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Claude Code's native rules file |
| `AGENTS.md` | Cross-tool standard rules file |
| `.claude/rules/` | Path-scoped rules that load when the agent works on matching files |
| `.claude/skills/` | Skill packages |
| `.claude/agents/` | Subagent definitions |
| `.claude/hooks/` | Hook scripts *(course convention)* |
| `.claude/references/` | Steering docs and on-demand reference docs *(course convention)* |
| `.claude/settings.json` | Hook configuration and permissions, shared with the team in git |
| `.claude/settings.local.json` | Your personal settings, gitignored |
| `.mcp.json` | MCP server configuration |

Claude Code reads the entries not marked as course conventions on its own. The `hooks/` and `references/` folders are where the course keeps things: hooks are wired by path in `settings.json`, and skills point to references.

## Skills referenced on this site

Every named skill on this site comes from the **course's skill pack**, the `.claude/skills/` folder in the course repo. None are built into Claude Code. Use them as they are, or as starting points for your own.

| Skill | What it does |
|-------|--------------|
| `plan-create-prd` | Interviews you and writes a PRD or an epic |
| `plan-architecture` | Works through the architecture decisions for an epic |
| `piv-slice-epic` | Slices an epic into PIV-sized tickets with a dependency graph |
| `piv-validate` | Runs the project's full test, type-check and lint suite |
| `rules-create-global` | Sets up a lean CLAUDE.md for your project |
| `rules-check-drift` | Checks your rules file against recent code changes |
| `hooks-create` | Writes a hook from a plain-English description |
| `skills-create` | Creates new skills and adapts existing ones |
| `ai-layer-review` | Reviews changes to your AI layer the way you'd review code |
| `worktree-create` | Sets up git worktrees for parallel work, with dependencies installed |
| `worktree-merge` | Merges parallel branches through one integration branch, validating after each |
| `ast-grep` | Helps write structural code-search rules |

## See also

- [The five primitives](/primitives/overview/) — detailed coverage of each primitive
- [What changed](/v1-delta/what-changed/) — V1 to V2 term mapping
