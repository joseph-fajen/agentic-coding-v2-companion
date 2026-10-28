---
title: Start here if you're not a developer
description: Who this is for, what you need, a first project step by step, what to skip, and when to bring in a developer
---

:::tip[TL;DR]
- **You can build useful tools for your business this way,** but the course is built for people who already code with AI. Expect an on-ramp.
- **You decide what to build and check that it works. The agent writes the code.**
- **You'll need** Claude Code with a paid plan, a terminal, git and a code editor. Most of this site can wait.
- **Bring in a developer** before anything handles payments or sensitive customer data, or goes out to customers.
:::

## Is this realistic for you?

The course says it openly: it's built for people already using AI to code, and from video V3 on it assumes you can operate a coding agent. That doesn't rule you out. It means your first week is setup and learning the tool, before the course material proper.

Here's the deal the course offers: **you own the planning and the checking, and the agent owns the writing.** In plain terms:

- **Planning** is deciding what the tool should do, for whom, and what it should *not* do.
- **Checking** is trying it yourself and confirming it does what you asked.
- **Writing the code** is the agent's job. You don't need to be able to write it, but you'll read the agent's plans and approve its changes.

**This works well if you:**
- Can describe clearly what your tool should do and who will use it
- Are willing to learn the basics of a terminal and git, both explained below
- Have the patience to test each piece before moving on

**It's harder if** you've never opened a terminal. Budget extra time for setup, and watch the course's "Coding agent basics" video (V2.5) before anything else.

## What you'll need

| What | Why | Where |
|------|-----|-------|
| **Claude Code**, Anthropic's AI coding assistant | It's the agent that writes the code | [Install guide](https://code.claude.com/docs/en/quickstart) |
| **A paid Claude plan** | Claude Code runs on a subscription or on pay-per-use API credits. The course recommends the subscription. | [What it costs](/costs/) |
| **A terminal** | The text window where you type commands and run Claude Code. Every Mac and Windows computer has one built in. | Terminal on Mac, PowerShell on Windows |
| **Git and a GitHub account** | Git saves snapshots of your project, so you can always undo. GitHub stores them online. | [git-scm.com](https://git-scm.com/downloads), [github.com](https://github.com/) |
| **A code editor** | For looking at the files the agent creates | [VS Code](https://code.visualstudio.com/) (free) |
| **The course videos** (optional, recommended) | The hands-on walkthroughs. This site is a companion, not a replacement. | [Dynamous AI Mastery](https://discover.circle.so/products/dynamous-ai-mastery). Check there for current pricing. |

The course's full setup also installs Python, Node.js, UV and Docker, which its demo app needs. Add those when the course or your own project calls for them.

### Words you'll meet early

| Term | In plain English |
|------|------------------|
| **Repo** (repository) | Your project folder, tracked by git |
| **Commit** | A saved snapshot of your project that you can go back to |
| **Branch** | A separate copy of your work in progress, so experiments don't break the working version |
| **PR** (pull request) | A proposed change, reviewed before it joins the main version |
| **PRD** | A short document describing what you're building, for whom, and why |
| **Ticket** | One small, well-defined piece of work, like "add a phone number field to the form" |
| **Greenfield** | Starting a new project from nothing. That's probably you. |
| **CLAUDE.md** | A plain-text file in your project that tells the agent how your project works. It's read at the start of every session. |

More terms are in the [glossary](/glossary/).

## Your first project, step by step

1. **Pick something small and internal.** For example, a customer intake form that saves to a spreadsheet, or a simple inventory tracker. Your team should be the only users at first.
2. **Set up your tools.** Install everything in the table above and sign in to Claude Code. If you've never used a coding agent, watch video V2.5 first.
3. **Write a one-page description of the tool.** Cover what it does, who uses it, and what it does *not* do. This is your PRD. The course's `plan-create-prd` skill can interview you and write it. See [Greenfield planning](/workflow/greenfield-planning/).
4. **Set up the AI Layer.** In video V3 you install the course's starter setup on your project. Its `rules-create-global` skill writes your first CLAUDE.md from your PRD.
5. **Build one small piece at a time.** For each piece, the agent plans and you read the plan. Then the agent builds and you check the result. This is the PIV loop (Plan → Implement → Validate). See [Phase 1](/phases/phase-1/).
6. **Test with made-up data** before anyone relies on the tool.

## Before you touch customer data

- **Use made-up examples while you build.** Don't paste real customer details into the agent.
- **Keep passwords and keys out of the chat and out of the code.** They belong in a separate `.env` file that git ignores. A [hook](/primitives/hooks/) can stop the agent from reading that file at all.
- **Get a developer to review before going live** if the tool stores customer information.

## When to bring in a developer

You can go a long way on your own. Bring in a developer, even just for a review, before the tool:

- Takes payments or handles financial details
- Stores sensitive or regulated data, such as health, legal or identity information
- Goes out to customers, or needs to stay up reliably for many users

## What to read, and what to skip

**Read now:**
- [Phase 1](/phases/phase-1/): the course's first steps
- [The five primitives](/primitives/overview/): just the opening section, for the big idea
- [Rules](/primitives/rules/): what goes in your CLAUDE.md
- [Greenfield planning](/workflow/greenfield-planning/): planning a new project
- [What it costs](/costs/)

**Read when you need it:**
- [Skills](/primitives/skills/): once you've typed the same request three times
- [Hooks](/primitives/hooks/): once you have something to protect, like secrets or customer data
- [MCP / tools](/primitives/mcp-tools/): when the agent needs to reach another service, like a spreadsheet

**Safe to skip for now:**
- [Epic to tickets](/workflow/epic-to-tickets/): until you're adding features to a tool that already exists
- Parallel worktrees, Headless / SDK / CI and Archon
- [Phase 4](/phases/phase-4/) and the [Coming from V1](/v1-delta/overview/) section

## See also

- [Where to start](/#where-to-start): the other starting paths
- [What it costs](/costs/)
- [Glossary](/glossary/)
