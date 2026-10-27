---
title: Hooks
description: Deterministic guarantees that fire automatically — the agent can't talk its way past them
---

Here's a confession about that little "approve?" prompt your agent shows you before it runs a command: **you don't read it.** Nobody does. You click approve, approve, approve — until something *feels* off. That's not safety. That's theater.

The real move is the opposite of babysitting: **stop approving everything by hand — and hard-block the handful of things the agent must *never* do.**

## The Core Distinction

> **A rule *asks* the agent to behave. A hook *guarantees* it.**

A rule is guidance — you write it in your rules file, and the agent *usually* follows it. Probabilistic. A hook is a guarantee — it *always* fires, no matter what the model decides.

The decision rule is dead simple:
- When "usually" is fine, write a **rule**
- When it **must** happen every single time, write a **hook**

## Why Hooks Are the Odd One Out

Every other primitive is something the agent *picks up*. It decides to load a rule, dispatch a subagent, call a tool, run a skill.

A hook is different: **the agent never chooses it.** It fires on its own, on an event. That's why it comes last in the primitive order, and why "nothing composes a hook."

## What a Hook Is

A hook is a small piece of code that runs **automatically** at a specific moment:
- Before a tool runs
- After a tool runs
- When a session starts
- When the agent tries to finish
- Other lifecycle events

You don't invoke it. It fires on the *event*.

## The Marquee: Blocking What Must Never Happen

The most valuable hook you'll write isn't fancy. It's the one that stops the agent from doing the thing you can **never** let it do.

### Example: The .env Block

Top of the list: reading your `.env` — your secrets. A rule that says "don't read .env" is guidance; a clever prompt, a confused agent, a poisoned instruction can blow right past it.

A hook makes it a **guarantee**:

```python
# pre_tool_use.py
import json
import sys

data = json.load(sys.stdin)
tool = data.get("tool_name")
path = data.get("tool_input", {}).get("file_path", "")

# Block actual .env files (allow templates)
if tool == "Read" and path.endswith(".env") and not path.endswith(".env.example"):
    print(f"BLOCKED: Cannot read secrets file {path}", file=sys.stderr)
    sys.exit(2)  # Exit 2 = block the tool

sys.exit(0)  # Exit 0 = allow
```

### How It Works

1. This is a **PreToolUse** hook — it runs *before* every tool call
2. Claude Code hands it the tool and its input as JSON
3. We check: is the agent about to touch a real `.env`?
4. If yes — print the reason and **exit with code 2**
5. **Exit 2 blocks the tool**, and whatever we printed goes *back to the agent* as the reason

The model **can't** talk its way past this, because it's not asking the model — it's a gate in front of the tool.

### The Relief

That's the move. You didn't approve anything. You didn't babysit. You hard-blocked the thing that must never happen — and now you can let the agent run free on everything else.

## Visibility: The Audit Trail

The flip side of blocking is **seeing**. A **PostToolUse** hook runs *after* every tool call:

```python
# post_tool_use.py
import json
import sys
from datetime import datetime
from pathlib import Path

data = json.load(sys.stdin)
log_entry = {
    "timestamp": datetime.utcnow().isoformat(),
    "tool": data.get("tool_name"),
    "input": data.get("tool_input"),
}

log_file = Path(".claude/logs/post_tool_use.json")
log_file.parent.mkdir(parents=True, exist_ok=True)
with log_file.open("a") as f:
    f.write(json.dumps(log_entry) + "\n")

sys.exit(0)
```

Open the log: there's every command, every edit the agent made. A complete audit trail — for free, automatically.

## The Mental Model: Pre vs Post

| Type | When It Fires | Can Block? | Use For |
|------|---------------|------------|---------|
| **Pre** hooks | Before the tool | **Yes** | Guarantees, guards, gates |
| **Post** hooks | After the tool | No | Logging, formatting, reacting |

**Pre is the gate. Post is the log.**

## Exit Codes

| Code | Meaning |
|------|---------|
| **0** | Allow the tool to proceed |
| **2** | Block the tool — stderr goes back to the agent |
| **Other** | Non-blocking error |

## The Event Menu

Hooks fire on lifecycle events — this is the stable core:

| Event | When It Fires | Can Block? |
|-------|---------------|------------|
| **PreToolUse** | Before a tool runs | Yes |
| **PostToolUse** | After a tool runs | No |
| **SessionStart** | When a session begins | No |
| **Stop** | The agent tries to finish | Yes |
| **SubagentStop** | A subagent tries to finish | Yes |
| **Notification** | The agent needs you | No |

You don't memorize these — you reach for the one that matches *when* your thing should happen.

## Common Hook Patterns

| Pattern | Event | What It Does |
|---------|-------|--------------|
| **Never read secrets** | PreToolUse | Block reads of `.env`, credentials |
| **Never delete** | PreToolUse | Block `rm -rf` or dangerous commands |
| **Format on save** | PostToolUse | Auto-format every edited file |
| **Audit trail** | PostToolUse | Log every tool call |
| **Don't finish until green** | Stop | Run tests; block if they fail |
| **Load context** | SessionStart | Inject project context every session |
| **Ping me** | Notification | Desktop/Slack alert when agent needs you |

## Wiring: settings.json

Hooks are wired in `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "*",
        "command": "uv run .claude/hooks/pre_tool_use.py"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "*",
        "command": "uv run .claude/hooks/post_tool_use.py"
      }
    ]
  }
}
```

The **matcher** filters which tools the hook runs on. `*` means all.

## The Honest Catch: Hooks Run Real Code

A hook runs **arbitrary code, automatically, with your credentials**, every time its event fires. There's no sandbox.

So treat a hook like a piece of your CI pipeline: only run hooks you've read and trust. A hook you copy from a stranger's repo can do anything your shell can.

### What the Guarantee Actually Is

The hook *always runs* — that part's certain. But what it *catches* is only as good as the check you wrote. Your `.env` block matches the obvious paths; a determined agent could find an edge it doesn't match.

The hook is the *enforcement point* — you still own the coverage.

## Cross-Tool Reality

Hooks aren't a Claude Code party trick. They're everywhere now — and the big coding tools have converged on the same shape:

- **Claude Code**, **Codex**, **Cursor** all run your hook as a script, hand it JSON, and treat exit code 2 as "block"
- **Gemini CLI** does the same job differently — structured JSON output rather than exit codes
- **Pi**, **opencode** do it in-process as plugins

Learn it once, it transfers — same as AGENTS.md.

## Building Without Coding

You don't have to write hooks by hand. A `hooks-create` skill can write them for you:

```
/hooks-create "Don't let the agent finish until my tests pass —
run my test command when it tries to stop, and block if it fails"
```

Describe the guarantee you want. The skill:
1. Asks what it needs (your exact test command)
2. Picks the right event (Stop)
3. Writes the hook script
4. Wires it into settings.json

You answered a question and read the result. That's the whole build.

## Key Takeaways

- A rule asks; a hook guarantees — use hooks for non-negotiables
- **Exit 2 blocks** the tool; the reason goes back to the agent
- Pre hooks can block; post hooks observe and react
- Treat hooks like CI scripts — only run what you trust
- Works across tools — Claude Code, Codex, Cursor, Gemini CLI
- You can describe guarantees in plain English and let a skill write the code

## See Also

- [Workflow Primitives](/workflow/overview/) — how hooks fit into automated workflows
- [Headless / SDK / CI](/workflow/headless-sdk-ci/) — hook-driven automation patterns
