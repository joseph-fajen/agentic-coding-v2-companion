---
title: What changed
description: New concepts and structural reorganization in V2
---

V2 brings significant changes to both organization and concepts. This page maps everything that's different.

## Course structure

### From modules to phases

| V1 | V2 |
|----|----|
| 12 modules, linear sequence | 4 phases: Use → Understand → Evolve → Scale |
| Modules 1-8 complete, 9-12 incomplete | ~32 numbered videos + V02.5 supplemental + Phase 4 async |
| Topic-based modules | Primitive-based phases |

*(V02.5 is an optional "Coding Agent Basics" video for first-time agent users. Video counts updated July 2026 after course restructure.)*

## What's actually new vs. renamed (quick triage)

**Truly new — you need to learn these:**
- [Hooks](/primitives/hooks/) (entire primitive)
- [Steering documents](/steering/overview/) (direction.md, engineering.md)
- [Workflow automation patterns](/workflow/overview/) (headless, SDK, CI)
- The harness framing (see [Primitives Overview](/primitives/overview/))
- Progressive disclosure mechanism (see [Skills](/primitives/skills/))

**Renamed/refined — map your existing knowledge:**
- Commands → [Skills](/primitives/skills/) (with structure)
- `.agents/` → `.claude/`
- Implicit concepts → Explicit primitives (see [Primitives Overview](/primitives/overview/))

**Unchanged — your V1 knowledge transfers directly:**
- PIV loop
- Validation pyramid
- Rules principles
- MCP fundamentals

---

The four phases follow an intentional arc:

- **Phase 1 (11 videos + V02.5):** Create Your First System — brownfield planning, first PIV loop, worktrees
- **Phase 2 (12 videos):** [The primitives](/primitives/overview/) — each of the five primitives taught explicitly
- **Phase 3 (9 videos):** Improve & Scale — workflow automation, [headless/SDK](/workflow/headless-sdk-ci/), [Archon](/workflow/archon/)
- **Phase 4 (async):** Going further — team standards, AI-native design, AI-in-CI

### Folder layout

| V1 | V2 |
|----|----|
| `.agents/` | `.claude/` |
| `.agents/commands/` | `.claude/skills/` |
| No subagents folder | `.claude/agents/` |
| No hooks concept | `.claude/hooks/` |
| No references folder | `.claude/references/` |

The `.claude/` layout is now the standard Claude Code structure, recognized by the tool.

## The five primitives framework

V2 explicitly names five **tool-agnostic building blocks** that compose into any agentic system. This is the conceptual heart of the course.

### 1. Rules

Durable context the agent reads on every task. `CLAUDE.md` at root, plus on-demand references.

**New in V2:** Steering documents (`direction.md` and `engineering.md`) as specialized rules files.

### 2. Subagents

Specialized agents for isolated tasks. Fresh context per invocation — no context bleeding between calls.

Defined in `.claude/agents/*.md` with clear boundaries.

### 3. MCP / Tools

External integrations via Model Context Protocol. The "skill + CLI" pattern as a lighter alternative to full MCP servers.

Configured in `.mcp.json`.

### 4. Skills

Reusable, triggered procedures — evolved from V1 "commands."

**New format:**
- SKILL.md with frontmatter (name, description, allowed-tools)
- Progressive disclosure: metadata always loaded, body on trigger, references on demand
- Open standard: works across Claude Code, Codex, Cursor, Gemini CLI

### 5. Hooks

Pre/post tool use guarantees. **Entirely new in V2.**

The key distinction: *"A rule asks the agent to behave; a hook guarantees it."*

Events: PreToolUse, PostToolUse, SessionStart, Stop, etc. Exit code 2 blocks the action.

## New concepts

### Steering documents

Two specialized rules files that live in `.claude/references/`:

**direction.md**
- What the project IS and IS NOT
- Named clauses for citing decisions (e.g., `§not-a-general-chatbot`)
- Loaded by planning, architecture, and triage skills

**engineering.md**
- What code is judged against
- Your coding conventions and standards
- Loaded by implement, review, and fix skills
- Same file read by CI review workflows

### The harness concept

V2 adopts the framing: **Agent = Model + Harness**

- The harness is everything you wrap around the model
- "The harness matters more than the model"
- Your AI Layer / Layer 1 = your harness
- Built from the five primitives

### Progressive disclosure

Three-tier loading model for skills:

1. **L1:** Metadata always loaded (~100 tokens/skill)
2. **L2:** SKILL.md body loads on trigger (<5k tokens)
3. **L3:** References/scripts load only when used

Scripts run via bash; code never enters context, only output.

### Skill + CLI pattern

Skills don't replace CLIs — they **orchestrate** them:

- The CLI does deterministic work
- The skill provides reasoning + project context
- Agent runs the CLI via bash
- Custom checkers/helpers = the power move

### The universal arc

For every primitive: **Understand → Build → Build the thing that builds them**

Example: understand skills → build skills → build a skill that writes skills (meta-skill)

### Workflow automation

Multiple ways to automate the same workflow:

- One bigger skill (simplest)
- Headless scripts (`claude -p`)
- SDK integration
- Hook-driven automation
- CI pipelines
- Skill-as-orchestrator
- Archon workflows

**Key insight:** *"The steps don't change. What you hand between them doesn't change. The only thing that changes is what says go."*

### Trust before automate

Chain only what you already trust by hand:

1. Run steps manually, separately
2. Gain confidence in their quality
3. Then compose into autonomous workflow

### Fresh vs. persistent context

- **Fresh:** Where you need independence (reviewers get clean context)
- **Persistent:** Where you need memory (implementer keeps context)
- `--resume` flag controls this in headless workflows

## Term mapping

| V1 Term | V2 Term | Notes |
|---------|---------|-------|
| Commands | Skills | Now with frontmatter + structured format |
| `.agents/` | `.claude/` | Standard Claude Code layout |
| Global rules | Rules primitive | Plus steering documents |
| — | Subagents | New primitive, explicitly taught |
| — | Hooks | Entirely new in V2 |
| Module | Phase/video | Restructured organization |

## See also

- [The five primitives](/primitives/overview/) — deep dives on each primitive
- [Steering documents](/steering/overview/) — the new direction.md and engineering.md

Next: [What still applies](/v1-delta/what-still-applies/) — the V1 concepts that remain central.
