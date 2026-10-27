---
title: engineering.md
description: How code gets judged here — conventions, review criteria, and what "done" means
---

engineering.md answers one question: **How do we judge code here?** Not what to build — that's direction.md. But how to build it, what standards apply, and what "ready to merge" actually means.

## Why engineering standards matter

Without explicit standards, every code review is a negotiation. "Is this error handling good enough?" "Should I add types here?" The agent applies its defaults, and half the time those aren't your defaults.

With engineering.md, the agent knows *your* bar. It writes code to your standards the first time, and it reviews code against your criteria rather than generic best practices.

## The objective function

Start with what you actually optimize for. Most teams have an implicit priority — make it explicit:

```markdown
## The objective function

**Correct first. Simple second. Fast last.**

Correctness means the code does what it claims. Simplicity means minimal
complexity for the job. Speed of execution is a convenience; speed of
development is never a reason to skip verification.
```

This resolves ambiguity. When the agent has to choose between shipping fast and being thorough, it knows your priority.

## Technical stack

State the stack facts the agent needs to operate:

```markdown
## Technical stack

- **Python 3.12+** — all scripts run via `uv run --directory .claude`
- **Linting:** ruff (format + check) — enforced by post-tool-validate hook
- **Type hints:** Use them. The hook runs py_compile; mypy available but not enforced.
- **Dependencies:** Managed via pyproject.toml + uv.lock. Use `uv add` to add packages.
- **Scripts:** Live in `.claude/scripts/`. Shared modules in `scripts/integrations/`.
- **Skills:** SKILL.md with frontmatter. Body under 500 lines. References in `references/`.
- **Hooks:** Python scripts in `.claude/hooks/`. Must handle timeout gracefully.
```

This isn't documentation — it's operational facts. The agent needs to know exactly how to lint, test, and format in *this* project.

## Taste: encoding your principles

The hardest thing to teach an agent is *taste* — the judgment calls that experienced engineers make automatically. Encode yours:

### Think before coding

```markdown
### Think before coding
- State assumptions explicitly before implementing. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
```

### Simplicity first

```markdown
### Simplicity first
- Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- If you write 200 lines and it could be 50, rewrite it to be 50.

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.
```

### Surgical changes

```markdown
### Surgical changes
- Touch only what you must. Clean up only your own mess.
- Don't "improve" adjacent code, comments, or formatting.
- Match existing style, even if you'd do it differently.
- Remove imports/variables YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the request.
```

These aren't slogans — they're specific enough to apply. "Don't remove pre-existing dead code unless asked" is a concrete instruction the agent can follow.

## Code conventions

State the conventions that aren't obvious from the codebase:

```markdown
## Code conventions

- **Fail early and loudly.** Unsupported states raise exceptions. No silent
  fallbacks unless explicitly documented at the branch.
- **Errors as values.** Return typed errors or raise typed exceptions. Never
  return error strings a caller must parse.
- **Logging via logger.** Use `logging.getLogger(__name__)`. No bare `print()`
  in application code (scripts are fine).
- **Comments explain why.** Never narrate control flow. Code that needs
  narration is too complex — simplify it.
- **Type hints on public APIs.** Functions called from outside the module get
  full signatures. Private helpers can be lighter.
```

Each convention earned its place through a real failure or explicit decision. Don't include generic best practices the model already knows.

## Risk taxonomy

What raises the stakes of a change? Name it explicitly:

```markdown
## Risk taxonomy

What raises the stakes of a change:

- **Credentials and secrets:** .env files, API keys, OAuth tokens. Pre-tool-guard
  blocks these; don't try to work around it.
- **Memory vault writes:** The vault is the source of truth. Changes to SOUL.md
  are blocked; other writes require care.
- **External actions:** Anything that sends, posts, or creates externally.
  Requires explicit approval per direction.md §advisor-not-actor.
- **Hook changes:** Hooks run with full system access. Changes to `.claude/hooks/`
  or `settings.json` get extra scrutiny.
- **Destructive operations:** Deletions, overwrites of existing data. Flag and
  confirm.
```

Now the agent knows when to slow down. A docs change gets minimum review; a hook change gets adversarial scrutiny.

## Review posture

How should the agent review code (yours or its own)?

```markdown
## Review posture

- **"Could not tell" is a verdict.** Ambiguity produces inconclusive outcome
  for a human, never a silent pass.
- **Findings carry source.** Cite the rule violated and file:line. Unattributed
  findings teach nothing.
- **Tests prove decisions.** A test that stubs the deciding function passes
  under any mutation and proves nothing.
- **Match rigor to risk.** Docs changes get minimum review. Credential-adjacent
  changes get adversarial scrutiny.
```

This shapes how code review skills operate. The agent knows to cite sources, to flag ambiguity rather than pass, and to scale effort to risk.

## What "ready to merge" means

The most valuable section: an explicit checklist for "done."

```markdown
## What "ready to merge" means

1. **Lints clean** — `ruff check` and `ruff format --check` pass
2. **Types valid** — py_compile succeeds (post-tool-validate hook)
3. **Tests pass** — if tests exist for the changed area
4. **No security findings** — hooks don't block; no credential exposure
5. **Scope matches request** — no unasked-for "improvements"
```

Now the agent has a concrete checklist. Before calling something done, it can verify each item.

## Case study: a personal agent's engineering standards

Here's the structure of a real engineering.md:

| Section | Purpose |
|---------|---------|
| **How this document works** | Meta: who writes it, what graduates to CI |
| **The objective function** | Correct first, simple second, fast last |
| **Technical stack** | Python 3.12, ruff, uv, script locations |
| **Taste** | Think before coding, simplicity first, surgical changes |
| **Code conventions** | Fail early, errors as values, logging, comments, types |
| **Risk taxonomy** | Credentials, vault writes, external actions, hooks |
| **Review posture** | How to judge code, when to flag |
| **What "ready to merge" means** | The checklist |
| **How to evolve this doc** | When to add, when to graduate to lint |

Each section serves a clear purpose. The whole document is under 100 lines.

## The document meta-rules

Include instructions for how the document itself evolves:

```markdown
## How this document works

- The operator writes it. Agents may propose entries; promotion is a human edit.
- Anything machine-checkable graduates to a lint rule or CI check, then leaves.
- Entries are phrased so drift is catchable: auditable claims, not vibes.
- Every rule here earned its place through a real failure or explicit decision.

## How to evolve this doc

- Add a convention when a failure teaches a lesson.
- Graduate to lint/CI when a convention becomes machine-checkable.
- Entries that drift from the codebase get deleted, not annotated.
- Keep it actionable. This is for judging code, not a manifesto.
```

This prevents bloat. Conventions that can be automated should be automated. Conventions that no longer apply should be deleted.

## Writing your first engineering.md

Start with what you already enforce:

1. **State your objective function** — What matters most: correctness, simplicity, speed?
2. **Document your stack** — The exact commands for lint, test, format
3. **Encode 2–3 taste principles** — The judgment calls you make automatically
4. **List 2–3 code conventions** — The non-obvious rules specific to this project
5. **Define "ready to merge"** — The checklist for done

Then evolve it: every time you correct the agent's code style, check if it should be a convention. Every time a bug teaches a lesson, consider adding a rule.

## How engineering.md differs from rules

| Rules File | engineering.md |
|------------|----------------|
| Operational: map, commands, workflow | Quality: conventions, review, taste |
| Always-on, every task | On-demand, when writing/reviewing code |
| Changes when code changes | Changes when standards change |
| "Here's how to navigate" | "Here's how to judge" |

Both shape agent behavior, but they serve different purposes. The rules file is operational. Engineering.md is evaluative.

## Key takeaways

- engineering.md answers "how do we judge code here?"
- Start with your objective function — what matters most
- Document your stack with exact commands
- Encode taste: the judgment calls experienced engineers make
- Define "ready to merge" as a concrete checklist
- Graduate conventions to lint/CI when they become machine-checkable
- Keep it actionable — under 100 lines is ideal
