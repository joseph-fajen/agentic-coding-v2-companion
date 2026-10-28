---
title: Headless / SDK / CI
description: Five ways to run your workflow without you pressing go
---

Every time you run a skill, look at what it gave you, and hand that to the next one — **you're running a workflow.** You've been doing it for two phases. The steps are yours, the hand-off is yours, and the thing pressing go is **you.**

This section is about replacing that last part. Not the steps. Not the hand-off. Just you.

:::note[Is this for you?]
- **Read this when** you've run a multi-step workflow by hand several times and trust each step. This page automates the "pressing go" part.
- **Skip for now if** you haven't done that yet. Build one end-to-end loop by hand first: run a skill → check the output → run the next skill → verify. See [Phase 3](/phases/phase-3/) for the learning path.
- **How settled:** workflows are the one part of the toolkit that hasn't settled on a single shape yet, so the course teaches several ways to build them. For what each way bills, see [What it costs](/costs/#who-pays-for-each-way-of-running-it).
:::

## The core insight

> **The steps don't change. What you hand between them doesn't change. The only thing that changes is what says go.**

Five different ways to run the same workflow:

| Method | What says go | Best for |
|--------|--------------|----------|
| **Headless script** | A bash script | Full control over the feed |
| **SDK** | Your program | Reacting mid-run |
| **Hooks** | An event | Every run, interactive or headless |
| **CI** | A repository trigger | Work with nobody present |
| **Orchestrator** | A skill | Composing all of the above |

Same workflow, different drivers. Pick per job, not per ideology.

---

## Headless scripts

A script does what a skill can't: **guarantee that a check actually ran.**

### The reliability argument

> **An agent telling you the tests passed is a claim. A script that runs them is evidence.**

Ask an agent to run your tests and report back, and it will report back. Sometimes it ran them. When nobody's watching, that difference is the whole ball game.

In a headless script, your checks are commands in the pipeline — lint, types, tests — not prompts. The agent doesn't get to decide whether this step happened. It isn't asked.

### The control argument

Write a workflow as a skill, and you hand the agent your context engineering. It decides what to read, when to search, which tool to reach for, what to keep in its head. That's not a bad deal — that **optionality** is exactly why skills are good.

Write it as a script, and you keep those decisions:

| Decision | In a Skill | In a Script |
|----------|-----------|-------------|
| What's in the context | Agent decides | You decide per stage |
| Which model runs | Agent's default | You set `--model` per call |
| What survives | Agent decides | You choose: variable or file |
| Fresh or persistent | Agent decides | You choose with `--resume` |

**A skill hands the agent your context engineering. A script keeps it.**

### Fresh vs persistent context

The single most important decision per hand-off:

| Context | When to Use | Example |
|---------|-------------|---------|
| **Persistent** (`--resume`) | When the stage needs to remember | Fix loop: failure goes back to the same agent |
| **Fresh** (no `--resume`) | When you need a second opinion | Review: an agent that just wrote code is an author, not a reviewer |

**Fresh where you need independence. Persistent where you need memory.**

### Bound the loop

Every fix loop needs a bound:

```bash
MAX_ATTEMPTS=3
attempt=0

while [ $attempt -lt $MAX_ATTEMPTS ]; do
    # Run checks
    if run_checks; then
        break
    fi
    # Feed failure back to same context
    attempt=$((attempt + 1))
done
```

> **An unbounded fix loop is a way to spend money on a wall.** If it can't get to green in three goes, something is wrong that a human should look at.

### Hand-offs: variable or file

Every hand-off makes a choice:

| Form | When to use |
|------|-------------|
| **Variable** | Doesn't need to survive the run, internal to the script |
| **File** | Needs to cross a process boundary, or you want to read it later |

The checks output goes straight into the next prompt — a variable, never touches disk. The review lands as a file — you might want to read it after. Parallel hand-offs need files (a variable can't cross process boundaries).

---

## The SDK

The SDK is the same harness that powers Claude Code, as a library. Unlike a raw API call, you don't rebuild anything you own — **your `.claude/` layer comes with it.**

### What it is

The SDK runs the same loop you've been using: **gather context → take action → verify work → repeat.** That's the loop you've *been* for two phases. The SDK just hands it to you as something your code can call.

### What only a program can do

The differentiator: **in-process control**.

A shell script reads the agent's output **after it's done**. A program gets asked **while it's happening.**

```python
def can_use_tool(tool_call):
    if tool_call.name == "Edit" and "migrations/" in tool_call.path:
        return PermissionResultDeny("Cannot edit migration files")
    return PermissionResultAllow()
```

The agent wants to edit a migration file? Denied, mid-run, before it happens. Your script from the headless section could only find that in the diff, after the fact.

> **Around the run, you inspect what happened. Inside the run, you decide what's allowed to happen.**

### The auto-load

Notice what you don't do: you never tell it where your skills are. Your `.claude/` directory comes with it — same as your interactive agent, same as headless `-p`. A raw API call gives you a model and nothing else. **The harness and your layer come with you.**

### Script vs SDK

| Need | Reach for |
|------|-----------|
| Around the run (start, check result, decide next) | Script (`claude -p`) |
| Inside the run (intercept, decide mid-flight) | SDK |
| Long runs needing context management | SDK (automatic compaction) |
| The thing you're building IS the program | SDK |

Neither tool gets demoted. They're different jobs.

---

## Hooks

Everything you've automated so far ran because something **called** it — you, a script, a program. A hook runs because something **happened.** Same steps, same artifacts, same checks: the only new thing is that **the event is the invoker.**

### Guard vs trigger

In Phase 2 you built hooks as **guards** — they stood in front of something bad and said no. Here, hooks are **triggers** — they stand behind something finished and say *next*.

| Role | What It Does | Example |
|------|-------------|---------|
| **Guard** | Block the bad thing | Don't let the agent edit SOUL.md |
| **Trigger** | Continue the work | When investigate finishes, start fix |

Same primitive. Opposite role.

### The stop gate

Your checkers — lint, types, tests — firing the moment the agent *thinks* it's done:

```bash
#!/bin/bash
# Stop hook: gate completion on checks

# Guard: clean tree means nothing to gate
if git diff --quiet && git diff --staged --quiet; then
    exit 0
fi

# Run deterministic checks
cd app/backend
if ! (ruff check . && mypy . && pytest -q); then
    echo "Checks failed — fix and try again"
    exit 2  # Exit 2 blocks; exit 1 does NOT
fi
```

**The upgrade over a script:** A script gates the runs the script makes. A hook gates **every run** — scripted, headless, or you, on a Tuesday, in an interactive session. The event fires no matter who pressed go.

> **A script automates a run. A hook automates the habit.**

### The baton

An artifact hand-off between two context windows, triggered by an event:

```json
{
  "hooks": {
    "Stop": [{
      "command": "./baton.sh",
      "async": true
    }]
  }
}
```

When investigate's artifact lands, the hook starts fix in a **fresh context**. Two session IDs. Neither agent ever met the other. An event carried the artifact.

**The guard that makes it safe:**

```bash
# If artifact doesn't exist, not our event
[ -f "docs/issues/issue-$ISSUE.md" ] || exit 0

# If fix report exists, already done
[ -f "docs/issues/fix-report-$ISSUE.md" ] && exit 0
```

A hook has no memory — it fires every time. So the guard reads the state of the world and decides. **Every good hook starts with a guard like this.**

### The wake

A hook cannot start. It can't wake up at nine, it can't poll, it can't decide it's time. Something has to knock over the first domino — and that something is you, invoking a skill.

That's not a gap in the design. **That's the human at the seam.** You start it, events run it, you read what lands at the end.

And the first domino doesn't have to be a finger — the headless script can be the wake. The methods stack.

---

## CI pipelines

The first domino doesn't have to be a person. A pull request opens, an issue lands, a clock strikes nine — and your workflow runs.

### Three reasons

1. **Nobody present** — CI runs on GitHub's machines, off repository events. That's the whole act's promise, finished.

2. **The scheduler** — A hook can't wake up at nine. A `schedule` trigger is exactly a hook that wakes up at nine. **The limit from hooks is CI's feature.**

3. **Your layer runs there** — The GitHub Action is built on the Agent SDK. It reads your `CLAUDE.md`. It takes the same CLI flags your script passed. And the prompt input accepts a skill. **The thing that runs on GitHub's machines is the skill you wrote.**

### Interactive vs automation mode

| Mode | Trigger | Use case |
|------|---------|----------|
| **Interactive** | `@claude` mention | Team conversations in PRs |
| **Automation** | `prompt:` input in workflow | Unattended runs |

A workflow with no prompt input waits for a person to mention it. A workflow with a prompt input runs when the event fires.

### Security

When the trigger might be a stranger, every layer matters:

| Defense | What it does |
|---------|-------------|
| **Write access required** | Triggering takes repo write access |
| **Bots rejected by default** | No bot-triggers-agent-triggers-bot loops |
| **Fork secrets withheld** | PRs from forks get no tokens |
| **Base branch `.claude/` wins** | Malicious PR can't ship a hook — your config wins |
| **Sanitized input** | Hidden HTML, injection carriers filtered |
| **No auto-PR creation** | The tool insists on a human at the seam |

> **Restrict where nobody will look.** Up here, nobody's watching the run. So the permissions block stays minimal, the tools stay minimal, and anything you wouldn't want a stranger to trigger doesn't get a workflow at all.

### Bounds and costs

An unbounded loop is a way to spend money on a wall — and up here the wall bills twice: tokens, plus GitHub's minutes.

- `--max-turns` on the action
- `timeout` on the workflow
- Concurrency limits on the repo

---

## Orchestration

Count what you have now: a script can press go, a program can, an event can, a trigger can. **Five ways to run the same workflow — and every one of them is a thing that can itself be told to run.**

An orchestrator is a skill whose subject is your other automations.

### Two rules

1. **Orchestrate, don't implement.** The orchestrator never writes feature code. It launches work, steers it, reads what comes back, and decides. The moment it starts editing files itself, you've lost the thing you built it for — a clear head that isn't elbow-deep in any one task.

2. **Compose by name.** It tells an agent "run the investigate skill on issue twelve" — never "read this file and follow steps three through nine." Your skills stay whole, and the orchestrator stays small.

### The simple version

```markdown
Send an agent this prompt exactly, where X is the input: run the investigate skill on X.
When the investigation is done, send a new agent: run the implement skill on the artifact.
When the implementation is done, send the SAME agent: now run the pr skill.
When the PR is up, send a NEW agent: run the review skill on it.
Send me one digest when everything is done. Don't narrate while things run.
I might send you more of these — run them in parallel.
```

Eight lines of prose. That's the orchestrator.

Notice: new agent for the implementation (fresh context), same agent for the PR (it needs to remember), new agent for the review (an author can't review its own work). **Fresh where you need independence. Persistent where you need memory.**

### The vessel

The orchestrator can run:
- Your skills
- Your script from the headless section
- Your CI trigger
- And your hooks fire underneath all of it without being asked

**The methods were never competitors. The orchestrator is the thing that stacks them.**

### The upgrade pass

Five additions that make it trustworthy:

1. **Background** — Run stages as background agents; completion comes as a notification
2. **Steer** — If a stage is off course, message the SAME agent with a correction (steering beats respawning)
3. **Verify** — Before reporting done, check the authority: the PR exists, the checks are green, the artifact landed
4. **Gate** — At every merge: if a standing decision covers it, act and record it; if not, wait and ask
5. **Cap** — At most three workstreams in parallel; a stage that stalls twice gets stopped, not restarted forever

### The honest limit

Agent A hands to B, B to C, C back to A — and each one replans, because nobody owns the task. Context loss compounds with every transfer.

That's why the cap is in the file, and why the digests matter: the orchestrator owns the run, on paper.

But be honest about what's holding the loop: a model. A brilliant, steerable participant — that is also investigating, gating, digesting, and talking to you. Holding the loop is a job, and it's doing five others.

**The thing built to hold loops and nothing else is an engine.** That's [Archon](/workflow/archon/).

---

## Key takeaways

- **A claim isn't evidence** — deterministic checks in the pipeline, not in a prompt
- **Fresh or persistent** — choose per hand-off based on what the stage needs
- **Bound the loop** — always, everywhere, in every method
- **A script automates a run; a hook automates the habit**
- **Hooks can't start** — but scripts can wake them; the methods stack
- **Restrict where nobody will look** — CI security is about minimal permissions
- **The orchestrator stacks the methods** — it's a skill that runs your automations
- When the orchestrator's job is too many jobs, graduate to an engine
