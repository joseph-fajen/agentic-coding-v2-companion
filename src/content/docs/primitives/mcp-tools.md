---
title: MCP / Tools
description: How your agent reaches outside the codebase to operate on real systems
---

Your agent is brilliant inside your codebase — and blind to everything outside it. Your tickets, your analytics, your database, the live browser — it can't touch any of them. **MCP** is the fix.

## Why MCP exists

Without MCP, your agent can read files and run commands in your repo, but it can't:
- Check your Jira tickets or GitHub issues
- Query your database or analytics
- Browse a live webpage
- Connect to your company's internal systems

MCP (Model Context Protocol) is **"USB-C for AI"** — one standard port that works with many tools. Before MCP, every tool needed its own custom integration. With MCP, you plug a **server** in and the agent can use it immediately.

Think of it as how you connect your tooling:
- Your **personal** scripts
- Your **team's** services
- Your **company's** internal systems

Whatever your work runs on, MCP is how the agent gets to operate on it instead of just talking about it.

## What a server is

MCP uses a client-server architecture. Think of it like a web browser (client) connecting to websites (servers):

- Your **agent** is the **client** — it makes requests
- An MCP **server** exposes **tools** — actions the agent can call (like "create a Jira ticket" or "query the database")
- Servers can also expose **resources** (data the agent can read) and **prompts** (templates for common tasks)
- The server runs locally on your machine or over HTTP to a remote service

### Why servers beat hand-rolled integrations

The good ones are **built by the tool owner** — Atlassian's own server, PostHog's own server, Supabase's own. So it **works out of the box** and it's the maintained, blessed way to plug that tool in. You're not writing an integration; you're **connecting** one.

## Where to find servers

| Source | Description |
|--------|-------------|
| **Official MCP registry** | The first-party index at registry.modelcontextprotocol.io |
| **Docker MCP catalog** | Vetted, containerized servers you can browse and run |

When connecting, you choose a **scope**:
- **Project** scope → writes `.mcp.json` your whole team shares
- **Local** scope → just you

That scope choice is about *sharing*, not permissions — permissions come from what the server can do and the OAuth scope you grant.

## The per-session discipline

> **Don't pile on servers you're not using. Plug in the servers you need for *the session you're in* — not all of them, all the time.**

### Tool search changed the game

Claude Code now **defers** tool definitions by default — it doesn't load every tool upfront. Instead, it hands the agent a **search** tool and pulls in only the ones a task needs.

Anthropic's numbers: a big multi-server setup dropping from **tens of thousands of tokens to a few thousand** upfront — roughly an **85% cut** — and the agent got *more* accurate, not less.

So the per-session habit isn't about upfront tokens anymore. It's about **capability and trust** — every server you add is something the agent *can do* and something you have to *trust*.

## Security: capability *and* blast radius

Every server you connect can read or do things on your behalf — and not all servers are friendly. This is a real, documented attack surface.

### The threats

| Threat | Description |
|--------|-------------|
| **Tool poisoning** | Malicious instructions hidden inside a server's tool descriptions — invisible to you, read by the model |
| **Shadowing** | A bad server overriding how your trusted servers behave |
| **Rug pull** | A server you approved changing its tool definitions later — exfiltrating data weeks after install |

This is serious enough that the **NSA** put out dedicated MCP security guidance, and **six national cyber agencies** issued a joint advisory on adopting agentic AI safely.

### The mitigations

- **Narrow OAuth scopes** — ask for read-only when you only need to read
- **Separate read from write** — different servers for reading vs writing
- **Vet before connect** — look at third-party servers before trusting them
- **Pin versions** — get alerted if tools change
- **Prefer first-party** — official servers from the tool owner when they exist

## MCP + subagent composition

Here's where two primitives combine. Remember subagents run in their **own isolated context**. So instead of connecting a chatty MCP to your *main* session, you can give it to a **subagent**.

The server's tool definitions *and* its big, noisy outputs live in the **sub's** context — and the main agent just gets the clean summary back.

```yaml
# posthog-analyst.md
tools:
  - Read
  - Grep
  - Glob
  - mcp__posthog__exec  # Only this MCP tool
```

That's the `mcp__server__tool` convention: you grant an agent a *named* MCP tool right in the YAML. No Write or Edit — it's a read-only analytics expert and nothing more.

## The honest alternative: skill + CLI

A lot of what an MCP gives you, you can get from a **CLI plus a skill** — and often it's **simpler and better**.

Most tools already ship a command-line tool. Your agent can just *run it* — it has a shell. And a **skill** teaches it *how* — which flags, your conventions, the gotchas.

| When to use | Approach |
|-------------|----------|
| **MCP** | Tool owner ships a great server, you want structured/typed access, no good CLI, remote service with managed auth |
| **Skill + CLI** | Lighter, version-controlled, yours to shape, local tool control |

For a lot of jobs, `gh` plus a skill beats a GitHub server; your database CLI plus a skill beats a database server.

## Building your own server

What if the tool you want has no server? You can **build your own** to expose your company's internal systems to the agent.

It's genuinely valuable — and it's a whole topic of its own. This is about *using* MCP well; building servers is the next step when you're ready.

## Key takeaways

- MCP is how your agent operates on systems outside the codebase
- Plug in what you need for the session, not everything
- Security matters: narrow scopes, vet third-party, prefer first-party
- Combine MCP with subagents to keep your main context clean
- A skill + CLI is often simpler than a full server
- The judgment is yours: add for capability + trust, not for the sake of it

## See also

- [Skills](/primitives/skills/) — the skill + CLI pattern as an alternative to MCP servers
- [Subagents](/primitives/subagents/) — isolate MCP tools in a subagent to keep main context clean
