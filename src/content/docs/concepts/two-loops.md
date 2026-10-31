---
title: The Two Loops
description: The inner loop ships work; the outer loop improves the system that ships it
---

Here's the shape of all AI coding, once a system surrounds it: **two loops, not one.**

Most people only see the first loop — the one where you build things. Plan, implement, validate, ship. That's real work. But it's not the whole picture.

The second loop is where the system gets better. When something breaks or a mistake keeps recurring, you step out of building and ask: *what should change in my AI layer so this class of failure is less likely next time?*

![The Two Loops diagram](/agentic-coding-v2-companion/images/two-loops.png)

## The two loops

| Loop | Purpose | What happens | Ends with |
|------|---------|--------------|-----------|
| **Inner loop** | Ship work | Run R-PIV (Research → Plan → Implement → Validate) on one task | A merged PR |
| **Outer loop** | Improve the system | Fix rules, skills, or hooks when the inner loop fails | A better harness |

The inner loop is where you spend most of your time. You pick up a ticket, work through R-PIV, ship it, repeat. The loop doesn't have to run perfectly to move on — you just need to finish the task.

The outer loop is where you step back. Something went wrong, or keeps going wrong, or could be automated. You have a conversation with the agent about what to change in your AI layer. Then you go back to the inner loop.

## The asymmetry

You don't visit both loops equally. Most of the time you stay in the inner loop. You step to the outer loop only when:

- A mistake keeps recurring
- Something breaks badly enough to warrant a fix
- You notice an opportunity to automate

As the system matures, you step out less and less. The harness handles more; you handle less.

## Everything feeds the inner loop

All the planning work upstream — PRDs, architecture specs, epic research, ticket slicing — exists for one purpose: **to hand the inner loop one clean, well-scoped ticket.**

The greenfield planning process produces artifacts "you can grab onto in future coding agent sessions, like as we're going through all the R-PIV loops to actually build out the application." The epic gets grounded in the codebase, sliced into tickets, and each ticket becomes one pass through the inner loop.

## The discipline

The inner loop ends when the task ships. The outer loop ends when the harness is better.

Don't confuse them:
- If you're debugging a test failure in your feature — that's inner loop
- If you're adding a rule so the agent stops making that kind of test failure — that's outer loop

The outer loop is Phase 3 territory: check → trust → automate. You can't trust what you haven't checked, and you shouldn't automate what you don't trust.

## Key takeaways

- **Two loops, not one** — shipping work and improving the system are different activities
- **Inner loop = R-PIV** — Research, Plan, Implement, Validate, one ticket at a time
- **Outer loop = system evolution** — fix rules, skills, hooks when patterns fail
- **Asymmetric time** — most time in the inner loop; step out only when needed
- **Maturity means stepping out less** — a good harness handles more automatically

## See also

- [The System Gap](/concepts/system-gap/) — why you need a system in the first place
- [Phases overview](/phases/overview/) — how the loops map to the course phases
- [Hooks](/primitives/hooks/) — the outer loop often ends with a new hook
