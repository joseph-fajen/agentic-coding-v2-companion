---
title: Subagents
description: Delegate work to isolated agents with controlled context and structured reports
---

A subagent is the cheapest way to make your coding agent smarter — and the easiest one to get wrong. It's a second agent your main agent hands a job to: it goes off in its own context, does the work, and reports back.

But here's the catch that everything hangs on: **you never see what it actually did. You only ever see what it reports back.** So the real skill isn't spawning a subagent — it's **authoring what comes back** so the main agent, and you, can trust it.

## The Four-Hop Flow

Here's the whole thing in one picture:

```
You → Main Agent → Subagent [isolated context] → Main Agent → You
```

1. **You** give a task to your **main agent**
2. The main agent decides to delegate and hands the job to a **subagent**
3. The subagent runs in its **own, fresh context window** — it does the work, burns whatever tokens it needs
4. When it's done, it sends **one thing** back: a **summary**, to the main agent (not to you)
5. The main agent folds that summary into *its* context and reports back to **you**

### Context Can Be Lost at Each Handoff

Look at those two handoffs — main-to-sub, and sub-back-to-main. Context can be lost at each one:
- The main agent only passes in what *it* chooses to
- The sub only passes back what *it* chooses to

Those two seams are exactly the things you learn to control.

## Why Subagents Exist

Two killer use cases:

### 1. Context Isolation

The subagent's work happens in a separate window. It can read twenty files, run ten tools, make a mess — and **none of that lands in your main context.** The main session only ever sees the clean summary. That's how you do heavy work without rotting the context you actually care about.

### 2. Parallelization

Because each one is isolated, you can run **several at once** — independent jobs finishing in the time of the slowest one, not the sum of all of them.

## The Artifact: A Subagent Is Just Markdown

A subagent isn't a magic feature — it's a **markdown file**. Frontmatter (a name, a description, the tools it's scoped to, the model it runs on) and then a body which is its system prompt. Same thread as rules: *it's all composable markdown*, and where it lives — typically `.claude/agents/` — is just a tool convention.

### Built-In vs Custom

Your tool ships built-in agents — Explore for read-only codebase search, Plan, a general-purpose one. For quick, one-off exploration, just use those.

You author your own for the **recurring, specialized** jobs. Two ways: a command like `/agents` that scaffolds the file, or just write the markdown by hand.

## Why Author Your Own

The out-of-the-box agents are **fine** — they're a great starting point. But *fine* is the floor. The moment you have a recurring job — reviewing code *your* way, researching a feature against *your* conventions, checking a plan against *your* standards — you can **outperform** the built-in easily.

**Why you can beat them:** The built-in agents have to be **agnostic** — they work for everyone, on every stack, every convention. That generality is their ceiling. Once you understand how the built-ins work, you can beat them by being ruthlessly specific — to your tools, your stack, your conventions.

A focused, specialized agent beats a general one on *your* work every time. That specialization is the whole advantage.

## The Four Levers

When you author a subagent, you control **four things**:

### 1. Purpose (The Role)

What the agent *is* and what it's good at. A sharp, narrow purpose beats a vague broad one every time — a subagent that does one job well is worth more than one that sort-of does five.

```markdown
# Code Reviewer

You are an expert code reviewer specializing in Python FastAPI
applications with vertical slice architecture.

## Responsibilities
- Evaluate code quality and adherence to conventions
- Identify bugs, security issues, and performance problems
- Check architectural boundaries
```

Notice how specific this is — Python, FastAPI, vertical-slice. That's not a limitation; that's the lever working.

### 2. Dispatch (How the Main Agent Briefs It)

The `description` field is what your main agent reads to decide *when* to reach for this agent and *what* to hand it. A good description lists **when** to trigger it and even worked **examples** of the kind of request that should route here.

```yaml
description: |
  Use for code review of Python/FastAPI changes. Trigger when:
  - PR is ready for review
  - User asks to review changes
  - Implementation needs quality check

  Example requests:
  - "Review this PR"
  - "Check my implementation"
  - "Is this code ready to merge?"
```

The sub doesn't inherit your main conversation — the only channel is that brief. If it needs files, a diff, a ticket, the agent's instructions should make the main agent hand those in.

### 3. Process (The Workflow)

What should the subagent actually do? What should it **look at**, **read**, **focus on**, in what order? Plus **scoped tools** — a read-only reviewer simply *can't* edit your files if you never handed it the tools.

```markdown
## Review Process

1. Initial scan: understand the scope of changes
2. Component analysis: examine each changed file
3. Convention check: verify logging, typing, testing patterns
4. Boundary check: confirm architectural constraints

## Tools Available
- Read, Grep, Glob (read-only analysis)
- No Write, Edit, or Bash
```

Scoping the tools is part of the process: a documentarian that is *physically* read-only can't modify your code.

### 4. Output (The Report Format) — THE KING LEVER

> **You never see the work. You only see the report. So the report format is the single most important thing you author.**

A brilliant analysis returned as a wall of prose is worse than a mediocre one in a clean, structured summary — because the main agent can *act* on structure and gets lost in prose.

What a trustworthy report has:
- **Structured and parsable** — headings, not paragraphs
- **Evidence** — file paths, line numbers, severities, concrete claims
- **An explicit next-action** — what the main agent should *do* with this
- **Composable** — shaped so another agent or later step can consume it

```markdown
## Output Format

### Strengths
- [List what's working well]

### Issues
For each issue:
- **Category:** [security/performance/style/bug]
- **Severity:** [critical/major/minor]
- **Location:** `file:line`
- **Finding:** [description]
- **Suggested fix:** [code snippet]

### Questions
- [Anything unclear that needs clarification]

### Verdict
[APPROVE / NEEDS_CHANGES / REJECT]

**IMPORTANT:** Do not begin fixing any issues without explicit
user approval.
```

That last line reaches across the second handoff and controls **what the main agent does next**.

## The Anti-Pattern

One trap follows straight from the four-hop flow: **don't use a subagent to *prime* your main agent.** People think "I'll send a subagent to read the codebase so the main agent understands it." But the main agent **doesn't** get what the sub read — it only gets the summary. You paid the latency and threw away the context you actually wanted.

Subagents are for **delegating a job and getting a result back**, not for loading context into the main session. When you want the main agent to *know* something, put it in the main session.

## Model Routing

The `model` field, set per agent, is a cost lever. A pure breadth pass — glob, grep, read — can run on a **cheap, fast** model, and you can run several at once. An agent doing real **analysis or judgment** — like an analyst or reviewer — earns your **stronger** model.

You match the model to the job, one subagent at a time.

## The Meta Move

Once you've formed opinions about how *you* scope a purpose, structure a process, and shape output formats, you can encode those into the authoring itself: a **meta-agent** that writes new subagents the way *you* would.

That's "build the thing that builds the thing" — you stop hand-writing each one and start **generating** them to your standard.

## What We Didn't Cover

Everything in this section was **one** subagent reporting to **one** main agent. That's the primitive — the foundation.

What's beyond this:
- Subagents that **talk to each other**
- **Agent teams** where several agents share a task list and coordinate
- **Agent-to-agent communication** inside your coding tool

These build on top of the primitive and require understanding single-agent dynamics first. You can't compose what you don't understand.

## Key Takeaways

- A subagent runs in isolated context and reports back a summary
- You control four levers: **purpose**, **dispatch**, **process**, and **output**
- **Output is the king lever** — it's the only part you and the main agent ever see
- It's all composable markdown — built-ins are starting points you can beat
- Don't use subagents to prime context — use them to delegate and get results back

## See Also

- [Skills](/primitives/skills/) — compose subagents into larger workflows
- [MCP / Tools](/primitives/mcp-tools/) — give subagents scoped access to external systems
- [Archon](/workflow/archon/) — agent teams and graph-based orchestration at scale
