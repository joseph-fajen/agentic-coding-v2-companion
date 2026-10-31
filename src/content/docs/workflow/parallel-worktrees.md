---
title: Parallel coding with worktrees
description: Run independent tickets in parallel using git worktrees
---

:::tip[TL;DR — Same work, less waiting]
A worktree is an isolated copy of your repo on its own branch, sharing one git history. Two loops in two worktrees can't collide. This isn't more work per token — it's **throughput, not cost**: same total spend, faster delivery. The ceiling is you: scale parallel loops as far as you can still stay in the loop (3–5 for most people).
:::

:::note[Is this for you?]
- **Read this when** you have two or more tickets that touch different files, and a single loop reliably finishes without you rescuing it.
- **Skip for now if** you're still running your first tickets or working one ticket at a time.
:::

## Overview

When you've sliced an epic into independent tickets, you can run them in parallel. **Git worktrees** let you have multiple working directories from the same repo — each with its own branch, its own agent session, its own PIV loop.

> Independent tickets are the ones you can run at the same time — and that was decided back at slicing.

## What a worktree is

A git worktree is a second working directory of the same repo, on its own branch, sharing the same history. Same project, checked out twice, in two folders, so edits in one never touch the other. It's not a full clone — there's still one `.git` underneath.

Each worktree is a full working directory with its own:
- Branch
- Staged changes
- Working tree state

But they share:
- The same `.git` object store
- The same remotes
- The same history

Why that matters: isolation is the point. Two loops in two worktrees can't collide because they're literally editing different files on disk, on different branches.

## Three ways to create worktrees

### 1. Manual git (works in any tool)

```bash
# Create a worktree for a ticket
git worktree add worktrees/ticket-a -b ticket-a

# List active worktrees
git worktree list

# Remove a worktree when done
git worktree remove worktrees/ticket-a
```

Open your coding agent *in that folder* and start a loop, exactly like any other ticket. Nothing about the loop changes — it just runs in an isolated copy.

**Setup note:** A fresh worktree is a fresh checkout, so you re-initialize your environment there — install dependencies, and copy any untracked files like `.env` that git doesn't track.

### 2. The `/worktree-create` skill (portable to any assistant)

The payoff is letting the coding agent manage worktrees for you:

```
/worktree-create ticket-a ticket-b
```

The agent creates the worktrees, syncs dependencies, spins the app up to health-check that it works, tears it back down, and reports it ready to build in. You never touched git.

**Why a skill:** It works in *any* coding assistant. The agent is managing and creating the worktree for you, whichever tool you're in. That's the portable version.

### 3. Claude's native `--worktree` (Claude-only)

If you're using Claude Code specifically, this is built right in:

```bash
claude --worktree ticket-a
```

Creates the worktree and drops you into it. A `.worktreeinclude` file even copies your gitignored `.env` into the new worktree automatically. Same idea, one flag — but it's Claude-only. The skill is how you get that convenience everywhere else.

## The parallel workflow

### Running two loops

1. Point `/worktree-create` at two tickets at once — it stands up two worktrees in parallel, each on its own port so they don't collide
2. Two isolated copies of your app
3. In one, kick off the PIV loop for ticket A; in the other, ticket B
4. Both loops run at the same time — plan, implement, validate, side by side instead of back to back

**The only reason this is clean is that you picked two tickets that share no files.** That was the call you made at slicing time. If they touched the same code, you'd have a merge mess, not a speed-up.

### Bringing work back

Two options:

**Agent-managed merge** with `/worktree-merge`:
- Creates an integration branch
- Merges the first feature, runs the suite
- Merges the second, runs full validation (tests and type checks)
- Only then touches your main line
- Cleans up the worktrees

**PR exit** (the V9 muscle memory):
- Each worktree opens its own pull request
- You review and merge them on GitHub
- On a team, this is usually what you want — nothing hits main unreviewed

Either way, the point is the same: the output is real, integrated code, and you're never stuck wondering how to get your work out.

**Cleanup:** When a branch is merged you don't need its worktree. The merge skill offers to remove them; by hand it's `git worktree remove`. Don't let stale worktrees pile up.

## Throughput, not cost

Be clear about what this is and isn't:

- Running two loops in parallel does **not** cost more tokens than running them one after the other — it's the same two loops either way
- This is **not** spawning a swarm of agents to do more work
- It's the *same* work and the *same* spend, just finished in less calendar time

**Throughput, not cost.** Same wallet, faster delivery.

That holds per ticket. Your total bill can still rise, for two reasons:

- **You'll run more work.** Once loops finish faster, it's tempting to start more of them. That's more tickets, not more cost per ticket, but the bill grows all the same.
- **Each worktree has its own overhead.** A fresh checkout means a fresh session to prime, dependencies to install, and, once you add CI, its own pipeline run.

This is why [Phase 3](/phases/phase-3/) treats cost discipline as something that runs underneath every step up in automation. See [What it costs](/costs/) for billing and the controls.

## The human is the bottleneck

So why not run ten?

Because the bottleneck isn't the machine — it's you. Every one of these loops still needs *you* at the gate: reading the plan, triaging the review, approving the PR.

- Two or three, you can hold in your head
- Past a handful, you start forgetting where each one is, you rubber-stamp reviews you should've read, and the quality you built into the loop leaks out at the one gate that was always yours

**Scale parallel loops as far as you can genuinely stay in the loop, and no further.** For most people that's 3–5.

> Speed you can't supervise isn't speed. It's just risk arriving faster.

## When to parallelize

**Good candidates:**
- Independent feature tickets (no shared-file overlap)
- Test coverage for different modules
- Documentation across sections
- Refactoring isolated subsystems

**Bad candidates:**
- Tickets with tight dependencies (you can't parallelize a dependency chain)
- Changes to shared core abstractions
- Work requiring sequential decisions
- Two tickets that keep touching the same files — they're not independent

**The independence rule:** When two slices keep touching the same files, they're not independent — merge them or sequence them. File-level overlap is the cheapest dependency check there is.

## What breaks in real projects

Worktrees isolate your *files*, not your *environment*. A few things the course warns about, and a few more that bite in practice:

**Shared local services:**
- A local database (Postgres, SQLite file, Redis) is one instance. Two worktrees running migrations at the same time will collide.
- Same for any service that listens on a fixed port. The `/worktree-create` skill assigns different ports per worktree, but anything you spin up by hand won't know.

**Gitignore the worktrees folder:**
- If you create worktrees inside the repo (e.g., `repo/worktrees/ticket-a`), add `worktrees/` to `.gitignore`. Otherwise git sees them as untracked files and your status gets noisy.

**Disk usage adds up:**
- Each worktree is a full working directory (minus the `.git` objects). Dependencies get installed per worktree. If you don't clean up stale worktrees, disk fills up faster than you'd expect.

**When integration merges fail:**
- The `/worktree-merge` skill creates an integration branch, merges each feature, and runs the suite. If the suite fails on the second merge, you have a half-merged integration branch. The skill stops and reports; you debug. It won't push a broken branch, but the cleanup is manual.

**Environment re-init:**
- A fresh worktree has no `node_modules`, no `.venv`, no `.env`. The skill copies gitignored config files (like `.env`) via `.worktreeinclude`, but dependencies must reinstall. Budget that time.

## Key takeaways

- **A worktree is just an isolated copy** of your repo on its own branch, sharing one git history
- **Independence was decided at slicing** — only no-shared-file tickets can run in parallel
- **Same work, same tokens, less wall-clock** — throughput, not cost
- **Three ways to create:** manual git (any tool), `/worktree-create` skill (portable), `claude --worktree` (Claude-only)
- **The human is the bottleneck** — scale to 3–5 parallel loops, no further
- **Speed you can't supervise isn't speed**

The real depth on orchestrating parallel work comes in Phase 3, where Archon automates this whole pattern.

---

**Video reference:** Course V10 — Parallel PIV Loops with Worktrees
