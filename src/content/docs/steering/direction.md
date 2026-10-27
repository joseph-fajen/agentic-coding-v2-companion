---
title: direction.md
description: What this project is, and what it isn't — the scope boundary your agent can cite
---

direction.md answers one question: **What is this project?** Not how to build it — that's engineering.md. But what it *is*, what it *isn't*, and where the boundaries lie.

## Why direction matters

Without direction, every feature request is a judgment call. "Should I add multi-user support?" "Should I handle this edge case?" The agent guesses, and half the time you correct it.

With direction, those questions have answers. The agent reads your product thinking once and applies it consistently. When it declines to add something, it can cite the clause: "This would violate `direction.md §single-user`."

## The IS / IS NOT pattern

The clearest direction documents use a simple structure: what this project IS, and what it IS NOT.

```markdown
## What this IS

- **§advisor-not-actor** An advisor that drafts and recommends but never
  sends or posts. External actions require explicit approval.

- **§single-user** One deployment serves one person. No multi-tenancy,
  no user management, no authentication beyond platform integrations.

## What this is NOT

- **§not-autonomous-external** Not authorized to send emails, post to
  social media, or take any external action without explicit permission.

- **§not-financial** No financial transactions, billing, or money-related
  actions. No access to banking, payment, or investment systems.
```

Each clause has a name so the agent can cite it. Each clause is one or two lines — enough to be clear, not enough to be a manifesto.

## Case study: a personal agent

Here's a real direction.md from a personal AI agent project:

**What it IS:**
- `§advisor-not-actor` — Drafts and recommends, never sends or posts. External actions require approval.
- `§memory-first` — A memory system that captures conversations, extracts knowledge, retrieves context.
- `§single-user` — One deployment, one person. No multi-tenancy.
- `§platform-integrations` — Direct integrations with productivity tools. Read access; write only where configured.
- `§content-drafting` — Drafts content for social platforms. All saved for review, never published directly.
- `§proactive-not-intrusive` — Surfaces relevant information before being asked. Daily check-ins, task resurfacing.
- `§foundation-first` — Stability over features. Core functionality matters more than breadth.

**What it IS NOT:**
- `§not-autonomous-external` — Not authorized to send, post, create events without permission.
- `§not-a-general-chatbot` — Not a general assistant. Honest about gaps rather than confident guesses.
- `§not-multi-user` — Not designed for team access. One agent, one person.
- `§not-realtime-monitoring` — Not continuous monitoring. On-demand or scheduled check-ins only.
- `§not-financial` — No financial transactions or access to financial systems.
- `§not-destructive` — No file deletions outside designated areas. No irreversible actions without approval.

This creates clear boundaries. When the agent considers a feature, it has a lookup table: is this in scope or out?

## Aspirational architecture

Some direction documents include a third section: where the engineering is *going*. Not a requirement for today, but a constraint on new code.

```markdown
## Aspirational architecture

Do not reject a change for failing to complete this; reject new coupling
that makes it materially harder.

- **§skill-per-domain** Each capability domain owns its skill packages.
  Cross-cutting concerns live in shared modules; skills do not import
  each other.

- **§hooks-for-guarantees** Security boundaries enforced via hooks, not
  rules. Rules guide; hooks guarantee.

- **§memory-as-source-of-truth** Knowledge lives in the vault, not
  conversation history. Sessions can be cleared without losing knowledge.
```

The key instruction: "reject new coupling that makes it materially harder." You're not demanding the architecture exist today — you're protecting the path to it.

## Open questions

Some decisions aren't made yet. A direction document can track those too:

```markdown
## Open questions (no stance yet)

- **§open-voice-interface** Whether voice input/output belongs in the agent
  or stays external (e.g., voice memos processed as files).

- **§open-mobile-access** Whether mobile interaction beyond Slack is worth
  building.
```

When a PR touches one of these areas, the agent knows: this is contested territory, surface the tradeoff rather than assume.

## How agents use it

The direction document serves different roles depending on the task:

| Task Type | How direction.md Helps |
|-----------|------------------------|
| **Feature planning** | Agent checks if the feature is in scope before proposing |
| **Triage** | Agent can cite clauses when declining out-of-scope requests |
| **Architecture review** | Agent checks new code against aspirational architecture |
| **PR review** | Agent flags scope creep: "This adds multi-user patterns but we're §single-user" |

The pattern: the agent reads your product thinking and applies it without you re-explaining every time.

## The clause naming convention

Every clause gets a name prefixed with `§`. This isn't decoration — it's infrastructure.

```markdown
✗ "We don't do financial transactions."

✓ **§not-financial** No financial transactions, billing, or money-related
  actions.
```

The `§` prefix lets the agent cite precisely: "Declined per `direction.md §not-financial`." You can search for it, audit it, and trace exactly which decision drove the behavior.

## Writing your first direction.md

Start small. You probably have 3–5 clear boundaries already — write those down:

1. **Write 2–3 IS clauses** — the core identity of your project
2. **Write 2–3 IS NOT clauses** — the boundaries you've already enforced
3. **Name each clause** — `§short-name` format
4. **Add aspirational architecture** only if you have clear direction
5. **Add open questions** only if there are active debates

Then evolve it: every time you explain a scope boundary to the agent, check if it should be a clause. Every time you make a direction decision, add it.

## How to evolve direction.md

| Trigger | Action |
|---------|--------|
| You've explained the same boundary three times | Add an IS or IS NOT clause |
| A new product decision sticks | Add a clause |
| An open question gets resolved | Move it to IS or IS NOT |
| An IS clause no longer applies | Delete it — don't annotate, delete |
| The agent cites a clause that's wrong | The clause drifted — fix or remove it |

Keep entries to one or two lines. This is for fast lookup during planning and triage, not documentation.

## Key takeaways

- direction.md answers "what is this project?" — scope and boundaries
- Use the IS / IS NOT pattern with named clauses (`§single-user`)
- Aspirational architecture protects the path forward without demanding it today
- Open questions mark contested territory for the agent to surface
- Start with 3–5 clear boundaries you've already enforced
- Evolve it: every scope conversation is a potential clause
