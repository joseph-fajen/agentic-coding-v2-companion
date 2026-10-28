---
title: Migration checklist
description: What happens to each V1 artifact, and the steps to update your V1 system to V2, in one order
---

This checklist updates a V1 setup to V2. **Steps 1–3 are the high-value changes, so do them first.** Steps 4–6 can follow in any order as time allows.

You can migrate one piece at a time. Commands in `.claude/commands/` keep working in Claude Code, so you and your teammates can keep using V1 commands while you convert them.

## What happens to your V1 artifacts

| V1 artifact | In V2 | What to do |
|-------------|-------|------------|
| **CLAUDE.md** | A lean rules file: codebase map, commands, ground rules, agent steering | Cut and split it ([step 1](#1-cut-and-split-your-rules-file)) |
| **Situational content in CLAUDE.md** | Path-scoped rules, steering docs or skills, loaded only when needed | Move it out ([step 1](#1-cut-and-split-your-rules-file)) |
| **Manual "always check X" steps** | Hooks: guarantees the agent can't skip | Turn the non-negotiables into hooks ([step 2](#2-add-hooks-for-your-non-negotiables)) |
| **PRD** | Still the strategic doc on a brand-new project. Its scope, meaning what the project is and isn't, moves into `direction.md`. New work on an existing project starts as an epic instead. | Seed `direction.md` from it ([step 3](#3-add-steering-docs-and-wire-them-in)). See [your workflow changed too](#your-workflow-changed-too). |
| **Big upfront plans, plan templates** | A short plan per ticket, written just before that ticket is built | Plan just-in-time ([workflow](#your-workflow-changed-too)) |
| **Commands** | Skills | Keep them for now, and convert gradually ([step 4](#4-convert-commands-to-skills-gradually)) |
| **`.agents/` folder** | `.claude/` | Delete it once everything in it has moved ([step 6](#6-tidy-the-folder-layout-optional)) |
| **PIV loop, validation pyramid, Layer 1 / Layer 2** | Unchanged | Keep. See [What still applies](/v1-delta/what-still-applies/). |

## Your workflow changed too

The biggest day-to-day change isn't a file. V1 ran **PRD → plan → execute**. In V2, new work on an existing codebase runs like this:

1. **Treat the epic as a hypothesis.** Research it against real signal like analytics or user feedback, then confirm, reshape or veto it.
2. **Ground it in the codebase.** Make the architecture decisions before slicing.
3. **Slice it into PIV-sized tickets.** About 10 subtasks and 500–1500 lines of change each, so one loop can finish one ticket.
4. **Plan just-in-time.** Write each ticket's plan right before you build it. Tickets that depend on another wait until it's built.

On a brand-new project, the PRD still comes first. See [Greenfield planning](/workflow/greenfield-planning/). For existing code, see [Epic to tickets](/workflow/epic-to-tickets/).

## The checklist

### 1. Cut and split your rules file

Your rules file loads on every task, so every line costs attention. Keep only what the agent needs every session.

- [ ] Apply the cut test to every line of CLAUDE.md: "would the agent do this anyway?" If so, cut it.
- [ ] **Keep:** the codebase map, ground rules, commands, and how you want the agent to operate
- [ ] **Cut:** slogans, generic best practices, step-by-step processes
- [ ] Move situational content to where it loads at the right time:
  - Conventions for one area of the code → `.claude/rules/<area>.md` with a `paths:` glob. It loads automatically when the agent works on matching files.
  - Judgment calls about scope or quality → steering docs ([step 3](#3-add-steering-docs-and-wire-them-in))
  - Step-by-step procedures → skills ([step 4](#4-convert-commands-to-skills-gradually))
- [ ] Multi-tool team? Put the shared content in AGENTS.md so every agent reads it, and keep CLAUDE.md thin. See [AGENTS.md vs CLAUDE.md](/primitives/rules/#agentsmd-vs-claudemd).

**Result:** a lean rules file, with everything else loading only when it's needed. See [Rules](/primitives/rules/).

### 2. Add hooks for your non-negotiables

A rule asks the agent to behave. A hook guarantees it. Start with the few things that must always or never happen.

- [ ] List your non-negotiables, such as "never touch `.env`" or "lint after every edit"
- [ ] Wire a hook for each in `.claude/settings.json`:

| Hook type | Use case |
|-----------|----------|
| **PreToolUse** | Block dangerous operations (`rm -rf`, credential access) |
| **PostToolUse** | Run the linter or type-checker after code changes |
| **SessionStart** | Inject context at the start of a session |
| **Stop** | Check that tests pass before the agent finishes |

- [ ] Make your hook script exit with code 2 to block. Exit 1, the usual failure code, lets the action through.
- [ ] Test each hook by triggering the condition it guards against, and confirm it blocks or runs

The course's skill pack includes `hooks-create`, which writes a hook from a plain-English description. **Result:** guarantees the agent can't talk its way past. See [Hooks](/primitives/hooks/).

### 3. Add steering docs and wire them in

Create two files in `.claude/references/`:

**direction.md:** what the project is and isn't. Seed it from your V1 PRD.

- [ ] What the project IS: core purpose, target users
- [ ] What it IS NOT: out-of-scope features, non-goals
- [ ] Named clauses for key decisions, such as `§no-database` or `§always-async`

**engineering.md:** what code is judged against.

- [ ] Coding conventions: naming, error handling, testing expectations, style
- [ ] What a reviewer should check

**Wire them in.** A pointer in CLAUDE.md is only a suggestion: the agent may never open the file. The course's own skills don't rely on it. Each skill reads the doc it needs:

- [ ] In your planning skill, add an instruction to read `.claude/references/direction.md` before settling scope
- [ ] In your implement and review skills, add an instruction to read `.claude/references/engineering.md` before writing or judging code
- [ ] Check that it works: run a planning or review task and ask the agent which clauses it applied. If it can't name any, the doc didn't load.

**Result:** scope and quality judgments come from your docs, not the agent's defaults. See [Steering documents](/steering/overview/).

### 4. Convert commands to skills, gradually

**Why convert:** the agent can pick up a skill on its own, based on its description. A skill can also bundle scripts and reference files, and its body loads only when it's used. Old commands keep working, so start with the ones you'd most want the agent to use without being asked. If a skill and a command have the same name, the skill wins.

For each command you convert:

- [ ] Create `.claude/skills/<name>/SKILL.md` with frontmatter:

```yaml
---
name: review
description: Review code changes for quality, security, and adherence to engineering.md. Use after implementing a ticket, before committing.
allowed-tools: [Read, Grep, Glob]
---
```

- [ ] Write the `description` in the third person, and say **when** to use the skill. It's what the agent reads to decide whether to load it.
- [ ] Add `allowed-tools` only where you want to restrict a skill's tools, such as read-only review skills. It's optional.
- [ ] Move the steps into the body, and link to references instead of pasting large context

For new skills, follow the [rule of three](/primitives/skills/#the-rule-of-three): bank a process once you've typed it three times. The course's skill pack includes `skills-create` for writing and adapting skills. **Result:** skills with progressive disclosure. See [Skills](/primitives/skills/).

### 5. Add subagents where fresh context helps

- [ ] Create `.claude/agents/<name>.md` for tasks that benefit from a clean context: reviewers, testers, researchers
- [ ] Define each one's job and the tools it may use

**Result:** isolated workers that report back a summary without filling your main session. See [Subagents](/primitives/subagents/).

### 6. Tidy the folder layout (optional)

Do this last. Skip it if your current structure works.

- [ ] Move anything left in `.agents/` into `.claude/`, then delete `.agents/`

```
.claude/
├── agents/       # Subagent definitions
├── rules/        # Path-scoped rules
├── skills/       # Skills
├── hooks/        # Hook scripts (course convention)
├── references/   # Steering docs and on-demand context (course convention)
└── settings.json # Hook configuration and permissions
```

Claude Code reads `agents/`, `rules/`, `skills/` and `settings.json` itself. `hooks/` and `references/` are course conventions: hooks are wired by path in `settings.json`, and skills point to references.

## Check it works

- [ ] Each hook blocks or runs when you trigger it
- [ ] Steering docs load during planning and review tasks (the check in [step 3](#3-add-steering-docs-and-wire-them-in))
- [ ] References load only when a task needs them, not on every task
- [ ] Your rules file still matches the code. Check before each merge; the course's `rules-check-drift` skill does this.
- [ ] Every skill earns its place. Remove the ones you never use.

## Going further (optional)

**Workflow automation.** Once you trust a multi-step workflow run by hand, automate it. See [Headless / SDK / CI](/workflow/headless-sdk-ci/), then [Archon](/workflow/archon/). For what each option bills, see [What it costs](/costs/).

**The course's skill pack.** The skills named on this page come from the course repo's `.claude/skills/` folder. They aren't built into Claude Code. Take them as they are, or use them as starting points for your own.

| Skill | What it does |
|-------|--------------|
| `plan-create-prd` | Interviews you and writes a PRD or an epic |
| `plan-architecture` | Works through the architecture decisions for an epic |
| `piv-slice-epic` | Slices an epic into PIV-sized tickets with a dependency graph |
| `hooks-create` | Writes a hook from a plain-English description |
| `skills-create` | Creates new skills and adapts existing ones |
| `rules-check-drift` | Checks your rules file against recent code changes |
| `ai-layer-review` | Reviews changes to your AI layer the way you'd review code |

## Quick reference

| V1 pattern | V2 equivalent |
|------------|---------------|
| `.agents/commands/foo.md` | `.claude/skills/foo/SKILL.md` |
| Everything in CLAUDE.md | Lean CLAUDE.md + path-scoped rules + steering docs + skills |
| Manual validation | Hooks + CI |
| PRD → plan → execute | Epic → ground → slice → plan just-in-time |
| PRD scope section | `direction.md` |
| Commands | Skills (old commands keep working) |
