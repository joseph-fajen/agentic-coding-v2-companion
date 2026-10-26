---
title: Skills
description: Reusable processes the agent loads on-demand — the primitive that ties the others together
---

Every workflow you run — priming, planning, reviewing, committing — is a **skill**. A skill is the primitive that takes a process you'd otherwise type out every time and packages it so the agent runs it *your way*.

It's also the one that ties the others together: a skill can drive your subagents and call your MCP tools. That's why skills come *after* subagents and MCP in the composition order.

## Rules vs Skills

> **Rules are principles. Skills are processes.**

Your rules file says *how we do things here, always*. A skill is a packaged *procedure* — a sequence the agent runs when a particular job comes up. Both are composable markdown; you choose where each piece lives.

## Two Flavors, One File

| Type | How It Fires |
|------|--------------|
| **User-invoked** | You call it, like `/piv-validate` |
| **Agent-invoked** | The agent reaches for it when your request matches the skill's description |

Same SKILL.md file; only the trigger differs. One you summon, one summons itself.

## Anatomy of a SKILL.md

A skill is a **folder** with a `SKILL.md` inside. Two parts:

### The Frontmatter

```yaml
---
name: piv-validate
description: |
  Validates the current implementation by running tests, type-checking,
  and linting. Use after implementation to verify code quality before
  committing or requesting review.
---
```

Two fields are required:
- **`name`** — unique identifier
- **`description`** — what the skill does and **when** to use it (third-person, because that's what the agent reads to decide whether to fire)

Vague description, never triggers. The description is the highest-leverage line in the file.

### The Body

Below the frontmatter is the **process** — the actual procedure:

```markdown
## Validation Steps

1. Run pytest: `cd app/backend && uv run pytest tests -q`
2. Run type-check: `cd app/backend && uv run mypy src/`
3. Run linter: `cd app/backend && uv run ruff check`
4. Smoke test the server

## Report Format
- Pass/fail for each step
- Any errors with file:line references
- Overall verdict: PASS / FAIL
```

That's it — the procedure, written down once.

### Bundled References and Scripts

A skill is a *folder*, not just one file. It can bundle:
- Extra reference docs the agent can read on demand
- Scripts the agent runs via bash

## Progressive Disclosure: Why Skills Scale

The clever part: the agent only loads a skill's *detail* when it actually needs it. That's **progressive disclosure** in three tiers:

| Tier | What Loads | When |
|------|------------|------|
| **L1** | Name + description only (~100 tokens per skill) | At startup — just knows it exists |
| **L2** | Full SKILL.md body | When the skill triggers |
| **L3** | Bundled references and scripts | Only when actually needed |

And the killer detail: when a skill runs a **script**, the script's *code never enters context* — only its **output** does.

This is the same context move MCP Tool Search makes — defer the detail, load on demand. You can install a *hundred* skills and pay only the metadata until one fires.

## The Marquee: Skill + CLI

> **Skills don't replace command-line tools — they orchestrate them.**

The CLI does the deterministic, repeatable work. The skill is the *reasoning and project-context layer* on top — and the agent runs the CLI itself, through **bash**.

### Teaching the Agent a Tool

`ast-grep` is a structural code-search tool — it finds code patterns by structure rather than text (e.g., "all functions that call `logger.error`" regardless of formatting). Powerful, but the rule syntax is fiddly. A cold agent guesses it wrong. The skill turns that into a reliable workflow: write a test snippet, build the rule, run `ast-grep scan` to verify, then search the codebase.

The agent runs the real CLI; the skill makes it *good* at it.

### Custom Checkers — The Power Move

A **custom checker** is a skill whose whole job is to run *your* tools:

```markdown
## piv-validate

1. Run tests: `cd app/backend && uv run pytest tests -q`
2. Run type-check: `cd app/backend && uv run mypy src/`
3. Run linter: `cd app/backend && uv run ruff check`
4. Smoke test: verify the server starts

Report pass/fail for each, then overall verdict.
```

Want a security scan, a schema check, a "did we break the API" probe? Same shape: a few lines of markdown that run your commands and shape the result.

**That's** where skills get genuinely powerful — your own checkers and helpers the agent runs every time, the same way.

## The Rule of Three

> The first time you prompt a process, just prompt it. The third time you've typed the same thing — stop, and bank it as a skill.

Under three, it's not worth the file. At three, it pays for itself.

## Take vs Build

| Situation | Approach |
|-----------|----------|
| **Tool that isn't yours + no strong opinion** | **Take** the tool owner's skill — works out of the box, they maintain it |
| **Your process + want to improve it over time** | **Build** your own — you'll outperform generic, and you sharpen it every time |

The axis is **"do you own the process?"**:
- Don't reinvent the Stripe skill
- Do build your own review/validate/plan/commit skills

### Why Build Wins

A generic skill can't know your process, so you'll outperform it easily — same lesson as subagents. And the real payoff is **ownership**: because it's yours, you **sharpen it over time**. Every time the agent gets something wrong, you tighten the skill, and it compounds.

A skill you own gets better; a skill you rented stays put.

## Where to Find Skills

| Source | Description |
|--------|-------------|
| **skills.sh** | Vercel Labs marketplace with install-count leaderboards |
| **SkillsMP** | Another marketplace for community skills |
| **SKILL.md Standard** | Open standard published by Anthropic, adopted by OpenAI — works across tools |

### Be Careful with Others' Skills

A skill is **instructions and scripts the agent will obey and run**. A malicious one can quietly tell the agent to exfiltrate data or misuse a tool — hidden right in the file.

Researchers found prompt injection in a significant share of public skills. Anthropic's rule is the right one: **treat a skill like installing software** — prefer first-party, read it before you run it, don't hand an unaudited skill access to your secrets.

## Composition + Chaining

A skill **composes** the earlier primitives. Inside a skill you can:
- Dispatch a subagent
- Call an MCP tool
- Run a CLI

A skill is the *conductor* — the other primitives are the instruments.

### Chaining Skills

Skills can chain — one skill running other skills:

```markdown
## piv-run-full-loop

1. Run the prime skill: `/prime-codebase $ARGUMENTS`
2. Run the plan skill: `/piv-plan-implementation $ARGUMENTS`
3. Run the implement skill: `/piv-implement-issue $ARGUMENTS`
4. Run the commit skill: `/commit`
```

One command, the whole loop. That's a **meta-skill**: a skill built out of skills.

### Trust Before Automate

You've got separate skills — implement, commit, open-a-PR, review — and you run them **by hand**, one at a time. Then, *once you trust their quality*, you **compose them into one skill that orchestrates the whole sequence autonomously**.

Chain only what you already trust by hand, or you've automated a process you don't yet believe in.

## The Universal Arc

For every primitive, you do three things:

1. **Understand** how it works
2. **Build** a few yourself
3. Build **the thing that builds the thing** — a skill that writes your skills, your way

The built-in skill-creator writes a generic skill. A custom meta-skill bakes in **your conventions** — your progressive-disclosure bar, your output shapes, your house style — so every skill it writes comes out the way *you'd* structure it.

**That's why we go understand-first:** you can only instill patterns you actually understand.

## Key Takeaways

- A skill is a process you bank so the agent runs it your way
- Progressive disclosure keeps skills cheap until triggered
- **Skill + CLI** is the power move — orchestrate your command-line tools
- **Take** for tools you don't own; **build** for your own processes
- Treat others' skills like installing software — audit before trust
- Skills compose the other primitives — they're the conductor

## See Also

- [Hooks](/primitives/hooks/) — the primitive that provides guarantees your skills can rely on
- [Archon](/workflow/archon/) — workflow engine for chaining skills at scale
