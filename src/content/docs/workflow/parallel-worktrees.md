---
title: Parallel coding with worktrees
description: Run independent tickets in parallel using git worktrees
---

:::caution[Draft]
This page is a stub. Content to be extracted from course video 1.14.
:::

## Overview

<!--
Course lesson: 1.14 Parallel AI Coding With Git Worktrees (13:13)

Key questions this page should answer:
- What are git worktrees?
- Why use worktrees for AI coding?
- How do you set up a worktree workflow?
- How do you manage multiple agents in parallel?
- What are the gotchas?
-->

When you've sliced an epic into independent tickets, you can run them in parallel. **Git worktrees** let you have multiple working directories from the same repo — each with its own branch, its own agent session, its own PIV loop.

## Why worktrees?

<!-- TODO: Extract from video script -->

Without worktrees, parallel work means:
- Stashing constantly
- Branch switching mid-task
- Context loss between tickets
- One agent at a time

With worktrees:
- Each ticket gets its own directory
- Each directory has its own branch
- Multiple agents can run simultaneously
- No context switching — everything is isolated

## Git worktrees basics

<!-- TODO: Extract from video script -->

```bash
# Create a worktree for a ticket
git worktree add ../my-project-ticket-123 -b ticket-123

# List active worktrees
git worktree list

# Remove a worktree when done
git worktree remove ../my-project-ticket-123
```

Each worktree is a full working directory with its own:
- Branch
- Staged changes
- Working tree state

But they share:
- The same `.git` object store
- The same remotes
- The same history

## The parallel workflow

<!-- TODO: Extract from video script -->

### Setup

1. Slice your epic into independent tickets
2. Create a worktree for each ticket
3. Open each worktree in its own editor/terminal
4. Start a Claude Code session in each

### Running

- Each agent works its own ticket
- Each follows the R-PIV loop independently
- PRs are created from each branch
- Reviews happen in parallel

### Merging

- Merge tickets in dependency order
- Resolve conflicts in the target branch
- Clean up worktrees as tickets complete

## Cost and token management

<!-- TODO: Extract from video script -->

Parallel agents mean parallel costs:

- Each session burns tokens independently
- Set per-session budgets
- Use model routing (cheap for mechanical, capable for judgment)
- Cap active parallel sessions

## When to parallelize

<!-- TODO: Extract from video script -->

Good candidates:
- Independent feature tickets
- Test coverage for different modules
- Documentation across sections
- Refactoring isolated subsystems

Bad candidates:
- Tickets with tight dependencies
- Changes to shared core abstractions
- Work requiring sequential decisions

## Key takeaways

<!-- TODO: Extract from video script -->

- Worktrees enable true parallel AI coding
- Each worktree = one ticket = one agent = one PIV loop
- Independence is key — slice tickets to minimize conflicts
- Manage costs with budgets and caps

---

**Video reference:** Course 1.14 — Parallel AI Coding With Git Worktrees
