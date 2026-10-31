---
title: Vibe Coding
description: The anti-pattern the whole system is defined against — prompting loosely and shipping agent output without owning planning or validation
---

Here's what most people do with AI coding tools: **send a prompt and hope for the best.**

No upfront planning. No context about the codebase. No validation strategy. Ship whatever the agent produces.

This is called **vibe coding**, and the entire course exists to replace it.

## Why it fails

Vibe coding feels fast. But it produces over-engineered, untested, unmaintainable code that misses the intent — because you left the agent to make every assumption about what you actually want.

The [System Gap](/concepts/system-gap/) statistic makes sense through this lens: 84% of developers use AI coding tools, 46% actively distrust AI accuracy. The distrust comes from vibe coding. The trust comes from having a system.

## The boundary: what isn't vibe coding

Here's a distinction worth holding onto:

> **Delegating 100% of the coding to the agent is NOT vibe coding — as long as you still own planning and validation.**

Cole hasn't written a line of code in over a year. That's not vibe coding. It's only possible "because I'm sandwiching it between the planning that I'm very much a part of, and then also the validation."

The sandwich:
```
┌─────────────────────────┐
│   Planning (you own)    │  ← Intent, spec, success criteria
├─────────────────────────┤
│   Coding (agent does)   │  ← The typing
├─────────────────────────┤
│  Validation (you own)   │  ← Tests, review, does it work?
└─────────────────────────┘
```

Remove either slice and you're back to vibe coding.

The boundary isn't "did a human type the code." It's **"did a human own the intent, the plan, and the check."**

## Vibe planning vs vibe coding

These labels rhyme, but they're opposites:

| | Vibe Coding | Vibe Planning |
|---|---|---|
| **What it is** | Dump a prompt and pray | Loose exploration before committing to a plan |
| **When it happens** | Skipping planning entirely | Start of the Plan step in R-PIV |
| **Who owns it** | Nobody | You do |
| **Outcome** | Agent invents everything | Agent researches, proposes, grills you with questions |
| **Endorsed?** | No — the anti-pattern | Yes — deliberate exploration |

Vibe planning is the unstructured conversation where you and the agent figure out what you're building. It ends with a structured [one-pass-ready plan](/glossary/#one-pass-ready-plan) the agent can execute. That's healthy.

Vibe coding skips all of it.

## Failure at every altitude

Vibe coding isn't just one mistake — it's the failure mode at every level of the system:

- **Skip the research beat** → build features nobody uses
- **Skip the one-pass-ready plan** → agent invents architecture
- **Skip validation and gates** → ship unreviewed code to production

The [R-PIV loop](/glossary/#r-piv-loop) (Research → Plan → Implement → Validate) is the structured alternative. It keeps you in the driver's seat at each of those points.

## Key takeaways

- **Vibe coding = prompt and hope** — no planning, no validation, ship whatever comes out
- **The sandwich matters** — planning and validation on either side of coding
- **Delegation isn't the problem** — you can delegate 100% of coding if you own the sandwich
- **Vibe planning is good** — loose exploration that ends with a real plan
- **R-PIV replaces dump-and-pray** — structured loop that keeps you in control

## See also

- [The System Gap](/concepts/system-gap/) — vibe coding is what no-system looks like in practice
- [The Two Loops](/concepts/two-loops/) — the structure that replaces vibe coding
- [Glossary: R-PIV loop](/glossary/#r-piv-loop) — the disciplined alternative
