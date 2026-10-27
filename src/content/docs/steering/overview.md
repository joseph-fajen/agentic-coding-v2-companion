---
title: Steering Documents
description: direction.md and engineering.md — the reference docs that shape how your agent thinks
---

Your rules file handles the operational layer — the map, the commands, the ground rules. But there's another layer: the *intent* behind the code. What is this project, and what isn't it? How should code be judged here?

That's what steering documents do. They're reference docs your rules file points to, loaded when the agent needs to make judgment calls about scope or quality.

**How they connect to your rules file:**
```markdown
# In CLAUDE.md
## Steering
For product direction and scope questions, see `references/direction.md`.
For engineering standards and review criteria, see `references/engineering.md`.
```

The agent reads the pointer, then fetches the full document when the task calls for it.

## The core insight

> **Steering documents encode the decisions you'd otherwise repeat in every conversation.**

"Should I add this feature?" "Is this code good enough?" Without steering docs, you re-explain your standards every time. With them, the agent reads your thinking once and applies it consistently.

## Two documents, two jobs

| Document | Question It Answers |
|----------|---------------------|
| **[direction.md](/steering/direction/)** | "What is this project, and what isn't it?" |
| **[engineering.md](/steering/engineering/)** | "How do we judge code here?" |

Direction handles product scope — what you're building, what's out of bounds, where the boundaries are. Engineering handles code quality — conventions, review criteria, what "ready to merge" means.

Together they give your agent the judgment layer it needs to make good decisions without asking you every time.

## Why separate files?

The course teaches "agent steering" as one of four things in your rules file. That's the right starting point. But as your project grows, steering content gets substantial — and it serves a different purpose than your always-on rules.

The move: **extract steering into reference documents**.

| In the Rules File | In Steering Docs |
|-------------------|------------------|
| Operational: map, commands, ground rules | Intentional: vision, boundaries, standards |
| Short, scannable, always-loaded | Detailed, reference-able, loaded on demand |
| Changes when code changes | Changes when decisions change |

Your rules file stays lean. Your steering docs can go deep. And the agent loads them when it actually needs to make a judgment call.

## How they load

Steering documents are **on-demand references** — the same pattern from the Rules primitive. The agent reads the pointer in your rules, then fetches the full document when the task calls for it. Progressive disclosure: one line always-on, full context when needed.

## What goes where

| Content Type | Where It Lives |
|--------------|----------------|
| "What this project IS and IS NOT" | direction.md |
| Product boundaries, scope guards | direction.md |
| Aspirational architecture | direction.md |
| Coding conventions, style rules | engineering.md |
| "What ready to merge means" | engineering.md |
| Risk taxonomy, review posture | engineering.md |
| The runnable commands | Rules file (always-on) |
| The codebase map | Rules file (always-on) |

If it's about *what to build*, it's direction. If it's about *how to build*, it's engineering. If it's operational and needed every task, it stays in the rules.

## The clause pattern

A steering document isn't a manifesto — it's a **lookup table** for decisions. The most effective pattern: name every clause so the agent can cite it.

```markdown
## What this IS

- **§single-user** One deployment serves one person. No multi-tenancy,
  no user management, no authentication beyond platform integrations.

## What this is NOT

- **§not-autonomous-external** Not authorized to send emails, post to
  social media, or take any external action without explicit permission.
```

Now when the agent declines to add a feature or flags a concern, it can say: "This would violate `direction.md §not-autonomous-external`."

Citable clauses make steering *auditable*. You can see exactly which decision drove the behavior.

## When to write them

**Not on day one.** Steering documents emerge from real decisions — the same way ground rules emerge from real mistakes.

| Signal | Action |
|--------|--------|
| You've explained the same scope boundary three times | Write it in direction.md |
| The agent keeps missing a coding standard | Write it in engineering.md |
| A new architectural decision needs to stick | Add a clause to the relevant doc |
| A line has drifted from reality | Update or delete it |

Start with a few clauses that encode decisions you've already made. Add more as patterns emerge. Delete when they no longer apply.

## The relationship to plans

Steering documents are **Layer 1** — stable context that applies across many tasks. They're different from plans, which are Layer 2 — task-specific context about what to build right now.

| Layer 1 (Steering) | Layer 2 (Plans) |
|--------------------|-----------------|
| "We never send emails without approval" | "Add the email draft feature" |
| "Errors as values, not strings" | "Fix the error handling in auth.py" |
| Project-wide, durable | Task-specific, temporary |

A good plan *references* the steering docs: "Implement per direction.md §platform-integrations" — so the agent knows the constraints before it starts.

## How to evolve them

Steering documents aren't write-once. They evolve as your project does:

1. **Add a clause** when a decision forces a direction call
2. **Move to IS or IS NOT** when an open question gets resolved
3. **Graduate to automation** when a rule becomes machine-checkable (linter, CI)
4. **Delete** when a clause has drifted from reality

The same discipline as rules: keep it true, or it's worse than nothing.

## Key takeaways

- Steering documents encode judgment: direction.md for scope, engineering.md for quality
- They're on-demand references your rules file points to — not always-on bloat
- Name clauses so the agent can cite them: `direction.md §advisor-not-actor`
- Write them when patterns emerge, not on day one
- Keep them true — a steering doc that lies is worse than none

## See also

- [Rules](/primitives/rules/) — the always-on context that references steering docs
- [What Changed](/v1-delta/what-changed/) — steering documents are new in V2
