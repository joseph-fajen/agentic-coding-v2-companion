---
title: "Why V2: the case and the costs"
description: Why the V2 approach beats one large CLAUDE.md, what it costs you, and the signals that say it's time to switch
---

:::tip[TL;DR]
V2 moves you from **one big instruction file the agent may or may not follow** to **a system that loads the right context at the right time, guarantees the non-negotiables, checks its own work, and gets better every time it fails.** The price is more files to keep true and a learning curve. Adopt it piece by piece, starting where your current setup hurts.
:::

:::note[Is this for you?]
- **Read this when** you're deciding whether V2 is worth adopting, or you need to explain the switch to someone else.
- **Skip for now if** you've already decided. Go straight to the [migration checklist](/v1-delta/migration-checklist/).
:::

## The case

### 1. Lean rules, detail on demand

**Every rule you add is a tax on the rules you already have.** As always-on instructions pile up, the share the agent actually follows drops. V1 put most guidance in one CLAUDE.md, so the file grew and the agent quietly skipped parts of it.

V2 keeps the rules file to what the agent needs every session. Everything else loads only when it's relevant:
- Conventions for one area of code load when the agent touches those files
- Scope and quality judgment loads from steering docs when a plan or review needs it
- Procedures live in skills. Until a skill is used, only its name and description load, about 100 tokens each, so you can keep dozens without crowding the context.

See [Rules](/primitives/rules/) and [Skills](/primitives/skills/).

### 2. Guarantees where they matter

**A rule asks the agent to behave. A hook guarantees it.** Some things can't depend on the agent remembering, such as never reading secrets or always running the linter. V2 moves them out of prose and into hooks, which the agent can't talk its way past. See [Hooks](/primitives/hooks/).

### 3. Evidence, not claims

**A claim isn't evidence.** "Tests pass" from the agent is a claim. A test run in the pipeline is evidence. V2 puts deterministic checks where the work happens, and anything a machine can check graduates out of your docs into a lint rule or CI check. See [Headless / SDK / CI](/workflow/headless-sdk-ci/).

### 4. The system compounds

**Fix the system, not the code.** When the agent gets something wrong, the natural move is to fix the code and move on. V2 makes fixing the system its spine: you fix the rule, skill or hook that let it happen, so the next run gets it right. Every failure becomes a permanent improvement. See [Phase 3](/phases/phase-3/).

### 5. Work sized for one loop

V2 replaces big upfront plans with epics sliced into PIV-sized tickets, each planned just before it's built. Plans stay small and current instead of going stale halfway through. See [Epic to tickets](/workflow/epic-to-tickets/).

## What it costs you

- **More files to keep true.** A lean rules file, path-scoped rules, two steering docs, skills and hooks. Each one can drift from the code, and a rules file that lies to the agent is worse than none. Plan for a drift check before merges.
- **On-demand context can be missed.** A pointer to a doc is a request, not a guarantee. The course's skills read the docs they need themselves. If you want certainty, a SessionStart hook loads a doc every session, trading tokens for determinism. The course itself debates which is better.
- **A learning curve.** Five primitives, plus knowing where each line belongs. Teammates need to learn it too. See [Running this as a team](/workflow/teams/).
- **More moving parts once you automate.** Headless runs, CI and workflow engines bring bounds, secrets and billing decisions. See [What it costs](/costs/).
- **Some of it is course convention, not Claude Code.** The `references/` folder and the named skills come from the course, not the tool. The [migration checklist](/v1-delta/migration-checklist/#going-further-optional) says which is which.

## Signals that it's time

If your V1 setup works and the agent follows it, there's no rush. Adopt V2 where you feel these:

| You notice... | The V2 fix |
|---------------|------------|
| CLAUDE.md keeps growing, and the agent ignores parts of it | [Cut and split your rules file](/v1-delta/migration-checklist/#1-cut-and-split-your-rules-file) |
| The agent does something you've told it never to do | [A hook](/primitives/hooks/) for that non-negotiable |
| You keep explaining the same scope boundary or quality bar | [Steering docs](/steering/overview/) |
| You type the same request over and over | [A skill](/primitives/skills/#the-rule-of-three) |
| The agent says it's done, but it isn't | Deterministic checks in the [pipeline](/workflow/headless-sdk-ci/) |
| You fix the same kind of mistake again and again | [Fix the system, not the code](/phases/phase-3/) |
| Plans go stale before you finish them | [Epic to tickets](/workflow/epic-to-tickets/), planned just-in-time |

## See also

- [Migration checklist](/v1-delta/migration-checklist/): the steps, in order
- [What changed](/v1-delta/what-changed/): the full list of differences
- [What it costs](/costs/): plans, billing and upkeep
