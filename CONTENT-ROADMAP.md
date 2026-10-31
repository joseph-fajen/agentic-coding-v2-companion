# Content Roadmap

Prioritized additions to the docs site based on gap analysis against the [Agentic Coding Course Knowledge Base](https://github.com/dynamous-community/agentic-coding-course/tree/main/knowledge-base).

## How to Use This Document

1. **Pick an item** from the highest unchecked priority tier
2. **Read the KB source** at the path listed (in `~/git/agentic-coding-course/`, fetch `origin/main` first)
3. **Write the docs page** in your voice — tutorial/narrative style, not encyclopedia style
4. **Check the box** and commit

The KB is reference material, not content to copy. Rewrite concepts for human readers with practical examples.

## Source Material

### Knowledge Base

The knowledge base lives at:
```
~/git/agentic-coding-course/knowledge-base/
```

Fetch latest before writing:
```bash
git -C ~/git/agentic-coding-course fetch origin main
git -C ~/git/agentic-coding-course show origin/main:knowledge-base/concepts/<concept>.md
```

Each KB page includes `## Sources` with video timestamps — use these to verify claims and add citations.

### Course Diagrams

33 Excalidraw diagrams are available at:
```
~/git/agentic-coding-course/diagrams/
```

PNGs are exports; ZIPs in `ExcalidrawFiles/` are editable sources. **Don't recreate these** — reference or selectively include if a visual is essential.

| Diagram | Maps To | Consider Including? |
|---------|---------|---------------------|
| `Excal-2-System-Gap.png` | The System Gap concept | Yes — foundational framing |
| `Excal-3-AI-Layer-Overview.png` | AI Layer / Harness | Yes — core architecture |
| `Excal-11-The-Harness.png` | The Harness concept | Yes — central mental model |
| `Excal-20-The-Two-Loops.png` | Inner/outer loop | Yes — referenced everywhere |
| `Excal-9-Epic-To-Tickets.png` | Epic to tickets workflow | Maybe — complements existing page |
| `Excal-17-Hooks.png` | Hooks primitive | Maybe — hooks page is already strong |
| `Excal-19-Check-Trust-Automate.png` | Phase 3 discipline | Maybe — good visual summary |

**Full inventory:**
1-Course-Introduction, 2-System-Gap, 3-AI-Layer-Overview, 4-Timescales-Of-Planning, 5-Where-Rules-Come-From, 6-Global-Rules-Setup, 7-Research-Beat, 8-Epic-Grounding, 9-Epic-To-Tickets, 10-PIV-Ticket-Execution, 11-The-Harness, 12-Rules-And-Context, 13-Subagents, 14-MCP-And-Tool-Search, 15-Skills, 16-Skill-Fanout, 17-Hooks, 18-Phase-2-Outro, 19-Check-Trust-Automate, 20-The-Two-Loops, 21-Ways-To-Automate, 22-Prompts-And-Scripts, 23-Why-An-Engine, 24-Archon-You-Built-The-Parts, 25-Archon-Workflow-Is-A-File, 26-Same-System-New-Owner, 27-One-Home-For-The-Layer, 28-Where-Your-Agents-Run, 29-Evolve-It-Together, 30-Steering-Documents, 31-The-Same-Review-For-Everyone, 32-AI-Optimized-Codebases, Course-Guide

---

## Tier 1: Foundational (High Impact)

These concepts are referenced throughout the course and docs. Adding them fills gaps that other pages assume readers understand.

### Mental Models

- [x] **The Two Loops** — Inner loop (ships work) vs outer loop (improves system)
  - KB: `concepts/the-two-loops.md`
  - Why: Referenced everywhere, core framework for understanding when to fix code vs fix the system
  - Suggested location: New page `concepts/two-loops.md` or add to glossary with depth

- [x] **The System Gap** — Why most developers plateau at "faster coding"
  - KB: `concepts/the-system-gap.md`
  - Why: Sets up the entire course thesis; explains what we're solving
  - Suggested location: Could enhance `start-here.md` or standalone `concepts/system-gap.md`

- [ ] **Vibe Coding** — The anti-pattern to avoid
  - KB: `concepts/vibe-coding.md`
  - Why: Defines what we're NOT doing; gives readers a negative example
  - Suggested location: `concepts/vibe-coding.md` or fold into system-gap page

- [ ] **Driver's Seat vs Along for the Ride** — Agency spectrum in AI collaboration
  - KB: `concepts/drivers-seat-vs-along-for-the-ride.md`
  - Why: Mental model for engagement level; helps readers calibrate
  - Suggested location: `concepts/` or enhance `start-here.md`

### Planning Quality

- [ ] **One-Pass-Ready Plan** — Plans the agent can execute without back-and-forth
  - KB: `concepts/one-pass-ready-plan.md`
  - Why: Quality bar for planning; directly actionable
  - Suggested location: `workflow/` section or enhance `workflow/greenfield-planning.md`

- [ ] **Self-Correction and Gates** — How agents catch their own errors
  - KB: `concepts/self-correction-and-gates.md`
  - Why: Reliability without babysitting; practical pattern
  - Suggested location: `primitives/` or `workflow/`

---

## Tier 2: Deepen Existing Sections (Medium Impact)

These strengthen pages that already exist by adding adjacent concepts.

### Planning Concepts (enhance workflow/)

- [ ] **The Research Beat** — When and how to research before planning
  - KB: `concepts/the-research-beat.md`
  - Why: The "R" in R-PIV; complements `greenfield-planning.md`
  - Suggested location: Add to `workflow/greenfield-planning.md` or standalone

- [ ] **Strategic Doc (PRD/Epic)** — Lightweight spec for agentic workflow
  - KB: `concepts/strategic-doc.md`
  - Why: Pairs with greenfield-planning; what the planning output looks like
  - Suggested location: Enhance `workflow/greenfield-planning.md`

- [ ] **Architecture Decisions** — ADRs in agentic workflow
  - KB: `concepts/architecture-decisions.md`
  - Why: Durable design choices; complements `epic-to-tickets.md`
  - Suggested location: `workflow/` section

- [ ] **Falsifiable Hypothesis** — Treating features as testable bets
  - KB: `concepts/falsifiable-hypothesis.md`
  - Why: Decision rigor in planning
  - Suggested location: `workflow/` section

- [ ] **Two-Way vs One-Way Doors** — Reversibility as decision framework
  - KB: `concepts/two-way-vs-one-way-doors.md`
  - Why: When to be careful vs move fast
  - Suggested location: `workflow/` or glossary

- [ ] **The Three Altitudes** — Strategic / tactical / operational planning levels
  - KB: `concepts/the-three-altitudes.md`
  - Why: Helps readers understand where they're operating
  - Suggested location: `workflow/` section

### Primitives Depth (enhance primitives/)

- [ ] **Guidance vs Guarantee** — The rule/hook distinction explored
  - KB: `concepts/guidance-vs-guarantee.md`
  - Why: Hooks page mentions this but doesn't explore it
  - Suggested location: Enhance `primitives/hooks.md` or standalone

- [ ] **Context Hygiene** — Keeping context clean across tasks
  - KB: `concepts/context-hygiene.md`
  - Why: Practical discipline; implied in subagents but not named
  - Suggested location: `primitives/` or glossary

- [ ] **Context Isolation** — Why subagents have fresh context
  - KB: `concepts/context-isolation.md`
  - Why: Deepens subagents explanation
  - Suggested location: Enhance `primitives/subagents.md`

- [ ] **Skill Chaining** — How skills invoke other skills
  - KB: `concepts/skill-chaining.md`
  - Why: Advanced skill pattern not currently covered
  - Suggested location: Enhance `primitives/skills.md` or standalone

- [ ] **On-Demand Context** — Loading context only when needed
  - KB: `concepts/on-demand-context.md`
  - Why: Ties progressive disclosure to practical use
  - Suggested location: Enhance `primitives/skills.md`

### Evolution Concepts (enhance phases/)

- [ ] **Prose Graduates to Checks** — Rules evolve into hooks
  - KB: `concepts/prose-graduates-to-checks.md`
  - Why: Evolution pattern; shows maturity path
  - Suggested location: Enhance `primitives/hooks.md` or `phases/phase-3.md`

- [ ] **Reactive and Proactive Evolution** — Two modes of improving the layer
  - KB: `concepts/reactive-and-proactive-evolution.md`
  - Why: Maintenance mindset for Phase 3
  - Suggested location: `phases/phase-3.md`

- [ ] **Build the Thing That Builds the Thing** — Meta-automation pattern
  - KB: `concepts/build-the-thing-that-builds-the-thing.md`
  - Why: Phase 3 mindset; powerful framing
  - Suggested location: `phases/phase-3.md` or standalone

---

## Tier 3: Advanced / Phase 4 (Lower Priority)

These are valuable but target advanced users. Add after Tiers 1-2 are complete.

### Team Scaling

- [ ] **Discovery Sprint** — Team onboarding to AI layer
  - KB: `concepts/discovery-sprint.md`
  - Suggested location: Enhance `workflow/teams.md`

- [ ] **The Layer Lives in the Repo** — Why layer changes are code-reviewed
  - KB: `concepts/the-layer-lives-in-the-repo.md`
  - Suggested location: `workflow/teams.md`

- [ ] **Where Agents Run** — Local vs CI vs cloud deployment
  - KB: `concepts/where-agents-run.md`
  - Suggested location: `workflow/` or standalone

- [ ] **Evolve the Layer Together** — Collaborative layer maintenance
  - KB: `concepts/evolve-the-layer-together.md`
  - Suggested location: `workflow/teams.md`

- [ ] **Shared Review and Triage** — Same review for humans & agents
  - KB: `concepts/shared-review-and-triage.md`
  - Suggested location: `workflow/teams.md`

### Orchestration Deep-Dive

- [ ] **Custom Orchestrator** — Why build your own
  - KB: `concepts/custom-orchestrator.md`
  - Suggested location: Enhance `workflow/archon.md` or standalone

- [ ] **Nested Orchestration** — Orchestrators inside orchestrators
  - KB: `concepts/nested-orchestration.md`
  - Suggested location: Advanced orchestration page

- [ ] **Workstream Contract** — Interface between orchestrator and workers
  - KB: `concepts/workstream-contract.md`
  - Suggested location: Advanced orchestration page

- [ ] **Run File** — The orchestrator's task specification
  - KB: `concepts/run-file.md`
  - Suggested location: Advanced orchestration page

- [ ] **Standing Decisions** — Pre-made choices that reduce planning
  - KB: `concepts/standing-decisions.md`
  - Suggested location: `workflow/` section

- [ ] **Beyond One Harness** — Cross-tool agent communication
  - KB: `concepts/beyond-one-harness.md`
  - Suggested location: Advanced architecture page

### Codebase Design

- [ ] **AI-Optimized Codebase** — Restructuring for AI navigability
  - KB: `concepts/ai-optimized-codebase.md`
  - Suggested location: Standalone page or `workflow/`

---

## Tier 4: Reference Material (Optional)

These could be valuable but may not warrant dedicated pages.

### Implementation Patterns

- [ ] **Input-Process-Output** — Skill design pattern
  - KB: `concepts/input-process-output.md`
  - Consider: Fold into skills page or glossary

- [ ] **The Rule of Three** — When to extract an abstraction
  - KB: `concepts/the-rule-of-three.md`
  - Consider: Glossary entry

- [ ] **Harness Engineering** — The discipline itself, named
  - KB: `concepts/harness-engineering.md`
  - Consider: Glossary depth or standalone

- [ ] **The Three On-Ramps** — Entry points into agentic coding
  - KB: `concepts/the-three-on-ramps.md`
  - Consider: Could enhance start-here.md

- [ ] **Use, Understand, Evolve, Scale** — The maturity arc
  - KB: `concepts/use-understand-evolve-scale.md`
  - Consider: Phase overview or standalone

### Entities (if individual pages desired)

- [ ] **Git Worktree** — Git's parallel branch feature explained
  - KB: `entities/git-worktree.md`
  - Currently: Referenced but not explained in parallel-worktrees.md

- [ ] **The AI Layer Starter Pack** — Course's starter template
  - KB: `entities/the-ai-layer-starter-pack.md`
  - Consider: Resource page or start-here.md

- [ ] **Background Agents** — Claude Code's background task feature
  - KB: `entities/background-agents.md`
  - Consider: Workflow section

- [ ] **Claude Agent SDK** — Programmatic agent control
  - KB: `entities/claude-agent-sdk.md`
  - Consider: Enhance headless-sdk-ci.md

---

## Completed

Items move here when done:

- [x] **The Two Loops** — `concepts/two-loops.md` + glossary entries
- [x] **The System Gap** — `concepts/system-gap.md` + glossary entries

---

## Notes

- **Don't copy KB content verbatim** — rewrite for human readers with narrative style
- **Check video timestamps** — KB pages cite sources; verify claims match the course
- **Match existing voice** — see `primitives/hooks.md` for the tone (conversational, practical, direct)
- **Update glossary** — if adding a new concept, add a short glossary entry too
