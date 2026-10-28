---
title: Running this as a team
description: Where the shared AI layer lives, who owns it, how it changes, and how every engineer gets the same standards and review
---

:::tip[TL;DR]
**Don't overcomplicate it.** A team's agents run on the same harness each engineer built in Phases 1–3. What changes is ownership. The layer lives in the repo and is reviewed like code. Someone owns it. Standards are written once and enforced automatically, and every pull request gets the same review.
:::

:::note[Is this for you?]
- **Read this when** more than one person works on the codebase with coding agents, or you're planning a rollout.
- **Skip for now if** you work alone. Come back when you have teammates.
:::

This page summarizes the course's Phase 4 team act and its team standards guide. The failure it prevents: **five engineers running five unspoken systems, with zero shared learning.**

## Discover before you standardize

Writing standards before people have used the tools produces rules nobody trusts. Start with a short discovery sprint:

1. For one or two weeks, everyone (or a group of champions, on a larger team) uses coding agents on real work
2. Talk about it every day, and write down what you learn as you go
3. Hold a retro to harvest what converged, what diverged and what each person built
4. Pick the first shared standard from the overlap, and name an owner

## Where the layer lives

**The layer lives in the repo**: committed, tracked by git, and reviewed like code. For most teams, that's the whole answer. New engineers get it the moment they clone, and checking out an old branch gives you that branch's layer.

The team decides what each engineer may customize, rather than leaving it to chance:

| Scope | What lives there | Where |
|-------|------------------|-------|
| **Repo** | This codebase's rules, skills, references and steering docs | In the repo: CLAUDE.md, `.claude/` and `.claude/settings.json`, committed |
| **Org** | Skills and rules for every codebase, and cross-project product direction | Shared direction goes in one place, such as a wiki, linked from the rules file and never copied. Org-wide skills: see below. |
| **Personal** | How the agent talks to you, your preferences, your own tools | `~/.claude` and `.claude/settings.local.json` (gitignored). Preferences only, never standards. A standard goes in as a pull request. |

**Many repos?** Each repo keeps its own layer. Give agents a short map of where the repos live, and work on one repo at a time. If a skill must stay byte-identical across many repos, distribute it as a private plugin marketplace, a git submodule or a versioned artifact, alongside each repo's own layer, never instead of it. Start simple, since moving up later is easy.

**Mixed tools?** Put the shared content in AGENTS.md so every agent reads it, and keep CLAUDE.md thin. See [AGENTS.md vs CLAUDE.md](/primitives/rules/#agentsmd-vs-claudemd).

## Onboarding a new engineer

Clone the repo, and the layer comes with it. Prime the agent on the codebase. Aim for their first AI-layer pull request by week two.

## Ownership

**Someone has to own the layer, or it rots.** Pick the model that fits your size:

- **Rotating owner:** one engineer per sprint reviews all AI-layer pull requests and runs the system review at retro. The default for small teams.
- **Per-domain owners:** each domain's tech lead owns that domain's references and skills.
- **A dedicated AI-layer owner:** at around 20 or more engineers, usually someone on a platform or developer-experience team.

## Changing the layer

AI-layer changes are pull requests, reviewed like code:

- **A rule earns its place through a real failure.** Every line costs attention, so each one must earn its keep.
- **A rule that has drifted from the code gets deleted,** not annotated.
- **Put AGENTS.md, CLAUDE.md and `.claude/` under CODEOWNERS.** An instruction file carries authority, so its authorship should be reviewed.
- **Review fast and keep the backlog small,** around five open AI-layer pull requests at most. Improvements compound.
- **Use the retro as the cadence.** Spend ten minutes on "did the AI layer help or hurt this sprint?", run the system review, and open one consolidated pull request.

The course's `ai-layer-review` skill reviews these changes the way you'd review code.

## Standards: written once, enforced three ways

Write each convention down **once**, in a doc that travels with the repo. The course's example is `conventions.md`, which covers commit and PR style. Three layers enforce it from that single source:

1. **Skills read the doc at run time,** so the agent works your way instead of a generic default
2. **Regex checks** guard the mechanical rules, such as commit message format
3. **A judge rubric** grades the judgment rules, such as whether the message describes the change

Anything a machine can check moves out of prose and into lint, types or CI, and each rule has one owner.

**Steering docs split by when they load:**

| Doc | Loads | Holds |
|-----|-------|-------|
| AGENTS.md / CLAUDE.md | Every session | Short, judgment only |
| `engineering.md` | When code is written or reviewed | What code is judged against |
| `direction.md` | When scope is decided | What the project is and isn't |

They load in one of two ways: a skill or workflow prompt that reads the file when it exists (the default), or a SessionStart hook that loads it every session, trading tokens for certainty. See [Steering documents](/steering/overview/).

## One review for everyone

- **A shared review workflow runs on every pull request** and judges the code against `engineering.md`
- **Triage checks issues and pull requests against `direction.md`.** Out-of-direction work gets a label and the clause it conflicts with, and is never closed automatically.
- **The base branch's AI layer wins.** A pull request can't change the workflow that reviews it, and pull requests from outside contributors run only after approval.

See [CI pipelines](/workflow/headless-sdk-ci/#ci-pipelines) for setup and security.

## Where your agents run

Decide this deliberately. For larger companies, it's a governance question:

- **Each engineer's machine:** the starting point
- **A local sandbox,** such as a Docker container, to limit what the agent can touch
- **Remote or dedicated machines** that everyone's sessions run on, which puts the whole team on the same system

## Where the human stays

Gates, standing decisions, merges, and **every change to the steering docs**. Agents may propose entries, but promoting one is a human edit.

## Templates

The course repo's `docs/team/` folder has copy-paste starting points: discovery sprint templates, a repo seed script, starter snippets, a CODEOWNERS file and a managed settings example.

## See also

- [Phase 4](/phases/phase-4/): the team act in the course
- [Steering documents](/steering/overview/)
- [Why V2](/v1-delta/why-v2/): the case and the costs
- [What it costs](/costs/)
