---
title: What it costs
description: Plans, billing for each way of running the agent, what drives token spend, and what each practice asks of you
---

:::tip[TL;DR]
- **For steady agentic work, a flat-rate subscription beats per-token API billing.** The course default is Claude Max (5×).
- **Your own automation can run on that same subscription.** Headless scripts, the SDK, CI and Archon all can. A product that serves *other people* needs an API key, and those tokens become your cost of goods.
- **Spend climbs with automation, not per run.** Each step up lets you run more work with less of you watching. Bound every unattended run.
- **The bigger cost is your time.** Every practice adds something to keep true. Adopt each one when the pain it fixes shows up.
:::

## Plans

The course teaches two principles that rarely change:

1. **For sustained agentic work, a flat-rate subscription beats per-token API billing.** Agent loops re-send the conversation every turn, so per-token cost grows fast with long, iterative work. A subscription gives you predictable cost. Subscriptions are usage-capped, not unlimited, but for steady loop work the flat plan is the safer default.
2. **Fewest iterations means lowest spend.** The question isn't "which model is cheapest per token" but "which model gets a correct result in the fewest loops." A cheaper model that needs twice the attempts isn't cheaper.

Plans the course recommends, as of July 2026:

| Plan | Price | When it fits |
|------|-------|--------------|
| **Claude Max (5×)** | $100/mo | The course default. Comfortable for steady day-to-day work. |
| **Claude Max (20×)** | $200/mo | Heavy or parallel work: several worktrees, subagent fan-outs. |
| **API billing** | Per token | Light use, CI jobs, and products that serve other people. Scales with every token. |

Prices change. Check [Claude pricing](https://claude.com/pricing) for current plans.

## Who pays for each way of running it

**Who the agent serves decides how it's billed.** Anything you run for yourself can ride your subscription. Anything that serves other people runs on an API key.

| How you run it | What it bills | Watch for |
|----------------|---------------|-----------|
| **Claude Code, interactive** | Your subscription | Usage limits on your plan |
| **Headless (`claude -p`)** | Your subscription: it uses the same login as your interactive agent | The `--bare` flag only accepts an API key, which moves you to per-token billing. Make sure no `ANTHROPIC_API_KEY` is set if you mean to use the subscription. |
| **Agent SDK, your own automation** | Your subscription, same as `-p` | Draws from the same usage limits |
| **Agent SDK, a product serving other people** | An API key | The tokens become your cost of goods |
| **CI (GitHub Action)** | A subscription token (`claude setup-token`) or an API key | The token is tied to the person who generated it. A team sharing one secret across repos uses an API key. GitHub also bills its own Actions minutes. |
| **Archon** | Your subscription, via `archon ai login anthropic` | Same usage limits |

Details: [Headless / SDK / CI](/workflow/headless-sdk-ci/) and [Archon](/workflow/archon/).

## What drives token spend

| Driver | What happens | The control |
|--------|--------------|-------------|
| **Long loops** | Every turn re-sends the conversation | Keep rules lean. Load detail on demand with [skills](/primitives/skills/) and [steering docs](/steering/overview/), not always-on context. |
| **Model choice** | Strong models cost more per token | Plan with a strong model, then execute and validate with a cheaper one. Judge by iterations, not price per token. |
| **Many tools** | Tool definitions load up front | MCP tool search cuts upfront tool tokens by roughly 85% on big setups. See [MCP / tools](/primitives/mcp-tools/). |
| **Parallel worktrees** | Same tokens per ticket, but you'll run more tickets, and each worktree primes its own session | Cap parallel loops at what you can review: 3–5 for most people. See [throughput, not cost](/workflow/parallel-worktrees/#throughput-not-cost). |
| **Unattended runs** | A loop that can't reach green keeps spending | Bound every run: a retry cap (three attempts), `--max-turns`, a workflow timeout, and concurrency limits on the repo. See [bounds and costs](/workflow/headless-sdk-ci/#bounds-and-costs). |

## What each practice asks of you

Money is usually the smaller cost. The larger one is the time to set each practice up and keep it true. The course doesn't give time estimates, so this table lists what each practice involves, not how long it takes.

| Practice | To set up | To keep it working |
|----------|-----------|--------------------|
| **Lean rules** | Trim your rules file to what the agent needs every session | Check it against code changes before each merge. A stale rules file is worse than none. See [drift](/primitives/rules/#keeping-it-true-drift). |
| **Steering docs** | Write `direction.md` (scope) and `engineering.md` (standards) | A human owns them. Agents may propose entries, but promotion is a human edit. |
| **Skills** | Turn a repeated prompt into a skill file | Only bank a process once you've typed it three times. See [the rule of three](/primitives/skills/#the-rule-of-three). |
| **Hooks** | Write a small script and wire it into settings | Only exit code 2 blocks. Exit 1, the usual failure code, lets the action through, so your script has to translate. |
| **Parallel worktrees** | Install dependencies and copy untracked files like `.env` in each worktree | Remove worktrees after merging |
| **Headless and CI** | A script or workflow file, a stored secret, and bounds | Keep permissions and tools minimal, since nobody is watching the run |
| **Archon** | Install the engine and connect it to your subscription | An extra tool to keep running. It's the course's choice, not the only option. |

**You don't need all of this at once.** Start with lean rules and one or two skills. Add the rest when the problem it solves actually shows up.

## See also

- [Phase 3](/phases/phase-3/): cost discipline as part of scaling up
- [Headless / SDK / CI](/workflow/headless-sdk-ci/): running workflows without you in the window
- [Parallel worktrees](/workflow/parallel-worktrees/): throughput, not cost
- [Glossary](/glossary/)
