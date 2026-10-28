# Agentic Coding v2 Companion Site: Adversarial Review Plan

**Created:** 2026-10-26
**Updated:** 2026-10-27
**Status:** Complete — all content gaps filled, site ready for use
**Purpose:** Two independent agents review all docs with skeptical, adversarial perspectives

---

## Execution Log

### Pass 1: Primary Approach (Source-of-Truth + Learner Advocate)
**Date:** 2026-10-26
**Commit:** `e23b21a`

Ran Approach A with Opus (accuracy) + Sonnet (learnability). Findings:
- **Accuracy:** 18 GREEN, 4 YELLOW, 0 RED
- **Learnability:** 12 GREEN, 8 YELLOW, 2 RED

Addressed all YELLOW and RED items. Key fixes: v1-delta terminology, progressive disclosure explanation, navigation improvements.

### Pass 2: Editorial Board (3-Agent)
**Date:** 2026-10-26
**Commit:** `4eb6fa0`

Ran Approach D with Accuracy Auditor + Learner Advocate + Structure Critic. Findings:
- **Accuracy V2:** 20 GREEN, 2 YELLOW, 0 RED
- **Learnability V2:** 14 GREEN, 6 YELLOW, 2 RED
- **Structure:** 18 GREEN, 3 YELLOW, 1 RED

Addressed remaining issues. Key fixes: consolidated duplicate steering docs, fixed internal links, added glossary to sidebar.

### Pass 3: Hostile Expert + Impatient Newcomer
**Date:** 2026-10-26
**Commit:** `be1fd57`

Ran Approach B with Opus (hostile expert) + Haiku (impatient newcomer). Most adversarial pass. Findings:
- **Expert:** 18 GREEN, 6 YELLOW, 2 RED
- **Newcomer:** 8 GREEN, 10 YELLOW, 4 RED

Addressed all issues. Key fixes:
- Updated video counts after July 2026 course restructure
- Added TL;DR / Quick Start sections to dense docs
- Moved key content earlier (Four Destinations, Why Subagents)
- Added Archon disclaimer (illustrative, not industry standard)
- Converted primitives/steering-* to redirect stubs

### Final State (Pass 1-3)
- **17 docs modified** across 3 passes
- **All RED items resolved**
- **Most YELLOW items resolved** (some deferred as stylistic preference)
- Site ready for announcement

### Pass 4: Course Coverage Audit
**Date:** 2026-10-27
**Commit:** `41205bf`

Compared docs site structure against full course curriculum (3 phases, 39 lessons). Identified content gaps in Phase 1 workflow topics.

**Gaps found:**
| Topic | Course Lessons | Status |
|-------|----------------|--------|
| Greenfield planning / PRD | V02 | ✅ Complete |
| Epic → Tickets workflow | V06, V07, V08 | ✅ Complete |
| Parallel coding with worktrees | V10 | ✅ Complete |

**Action taken (Phase 1 — stubs):**
- Created 3 stub pages in `workflow/`
- Each stub had `:::caution[Draft]` banner and `<!-- TODO -->` markers
- Added to sidebar under "Workflow primitives"

**Action taken (Phase 2 — content):**
- Extracted content from video scripts in `~/git/agentic-coding-course/phase_1/`
- Filled all 3 stub pages with course material:
  - `greenfield-planning.md` — from V02 (three on-ramps, strategic doc, Research beat)
  - `epic-to-tickets.md` — from V06/V07/V08 (epic as hypothesis, confirm/reshape/veto, grounding, slicing)
  - `parallel-worktrees.md` — from V10 (worktrees, throughput not cost, human bottleneck)
- Removed draft banners, added TL;DR callouts matching archon.md style
- Commit: `55fc4ef`

**Completed:**
- [x] Extract content from video scripts (V02, V06-V08, V10)
- [x] Fill in stub pages with course material
- [x] Remove draft banners when complete

### Current State
- **25 docs total** — all complete
- **0 draft pages** — all content gaps filled
- Site ready for use

### Pass 5: Audience Personas (ISV + Small Business Owner)
**Date:** 2026-10-28
**Status:** Review complete; all 7 recommended fixes applied (branch `docs/persona-review-fixes`)

Run Alternative F with Opus (ISV practitioner, v1 alum) + Sonnet (small business owner, non-developer). Each reviewer works through five persona-specific tasks before sweeping the site. Success bar for the small business owner: the site gives them a clear path (where to start, honest prerequisites, what to skip), not that every page is readable by a non-developer.

**Outputs:** `REVIEW-FINDINGS-ISV.md`, `REVIEW-FINDINGS-SMB.md`

Findings:
- **ISV:** 2/5 tasks completed; 10 GREEN, 18 YELLOW, 8 RED
- **Small business owner:** 0/5 tasks fully completed; 10 GREEN, 9 YELLOW, 6 RED

Shared themes: conflicting start/migration orders, cost of adoption missing, no skip/readiness signals on landing pages, named terms and skills without definitions or sources.

**Fixes applied:**
1. Home page: one "Where to start" section with four reader paths
2. New `costs.md`; reconciled worktrees vs Phase 3 cost wording
3. "Is this for you?" routing callout on 9 landing/workflow pages (pattern in CLAUDE.md)
4. Migration checklist rebuilt: V1 artifact table, one order, workflow-change section, steering docs wired into skills
5. New `start-here.md` for non-developers
6. New `v1-delta/why-v2.md` and `workflow/teams.md`
7. Glossary: Basics section, workflow terms (PRD, epic, ticket, worktree, etc.), skill-pack table, corrected file conventions

**Still open:** 44% adherence citation in `primitives/rules.md` (link vs caveat mismatch); readiness labels only where the course states maturity; remaining YELLOW items in both findings files.

---

## Overview

Two reviewers with orthogonal concerns:
1. **Source-of-Truth Verifier** — Is this accurate to the v2 course material?
2. **Learner Advocate** — Can someone actually learn from this?

Run as parallel Task agents with fresh context. Each produces a findings report.

---

## Site Structure (25 docs)

```
src/content/docs/
├── index.mdx                    # Home
├── glossary.md                  # Terminology reference
├── primitives/
│   ├── overview.md
│   ├── rules.md
│   ├── subagents.md
│   ├── mcp-tools.md
│   ├── skills.md
│   ├── hooks.md
│   ├── steering-overview.md
│   ├── steering-direction.md
│   └── steering-engineering.md
├── phases/
│   ├── overview.md
│   ├── phase-1.md
│   ├── phase-2.md
│   ├── phase-3.md
│   └── phase-4.md
├── workflow/
│   ├── overview.md
│   ├── greenfield-planning.md   # from V02
│   ├── epic-to-tickets.md       # from V06-V08
│   ├── parallel-worktrees.md    # from V10
│   ├── headless-sdk-ci.md
│   └── archon.md
├── steering/
│   ├── overview.md
│   ├── direction.md
│   └── engineering.md
└── v1-delta/
    ├── overview.md
    ├── what-changed.md
    ├── what-still-applies.md
    └── migration-checklist.md
```

---

## Source Material Locations

The reviewers need access to verify claims:

- **v2 Course Scripts:** `~/git/agentic-coding-course/` (branch: `origin/v2`)
  - Each video has a `script.md` and often a `*-runsheet.md`
  - Video numbering: V01-V35 plus Phase 4 async content

- **v1→v2 Delta Doc:** `~/git/obsidian-second-brain/memory/knowledge/courses/agentic-coding-v1-v2-delta.md`
  - Comprehensive mapping of what changed

- **MIGRATION.md:** In the course repo — official v1→v2 path mapping

---

## Reviewer 1: Source-of-Truth Verifier

### Persona

You are Cole Medin's proxy — a subject matter expert who has deeply studied the v2 course materials. You are skeptical that this companion site accurately represents v2. Your job is to catch:

- **Inaccuracies:** Claims that contradict the source material
- **Inventions:** Concepts or terminology that don't exist in v2
- **Conflations:** Distinct ideas merged incorrectly
- **Oversimplifications:** Nuance lost to the point of being misleading
- **Outdated v1 content:** Things that were true in v1 but changed in v2

### Instructions

1. **For each doc in the companion site:**
   - Read the doc carefully
   - Identify every factual claim, concept definition, and structural assertion
   - Cross-reference against the v2 course scripts
   - Flag any discrepancies

2. **Source verification process:**
   - Use `~/git/agentic-coding-course/` (v2 branch) as ground truth
   - For phase content, check the corresponding V## script files
   - For primitives, check Phase 2 videos (V12-V23) specifically
   - For v1-delta content, verify against MIGRATION.md and the delta doc

3. **Scoring (per doc):**
   - **GREEN:** Accurate to source. No material errors.
   - **YELLOW:** Minor issues. Wording could be tighter, but not wrong.
   - **RED:** Material inaccuracy. Would mislead a reader.

### Output Format

Write findings to `REVIEW-FINDINGS-ACCURACY.md`:

```markdown
# Source-of-Truth Review Findings

## Summary
- Docs reviewed: X/22
- GREEN: X | YELLOW: X | RED: X

## Critical Findings (RED)

### [doc-path.md]
**Claim:** "{quoted text from companion site}"
**Issue:** {what's wrong}
**Source says:** "{quoted or paraphrased from v2 scripts}"
**Location:** {which v2 script file}
**Suggested fix:** {specific correction}

## Minor Findings (YELLOW)

### [doc-path.md]
**Claim:** "{quoted text}"
**Issue:** {what could be tighter}
**Suggested fix:** {improvement}

## Clean Docs (GREEN)
- [list of docs with no issues]
```

### Model Assignment

Use **Opus** — this requires deep comprehension and cross-referencing.

---

## Reviewer 2: Learner Advocate

### Persona

You are a v1 graduate who just started v2. You haven't watched the videos yet — you're using this companion site to get oriented. You're skeptical that docs can substitute for actually taking the course. Your job is to catch:

- **Undefined terms:** Jargon used before it's explained
- **Assumed knowledge:** Prerequisites not made explicit
- **Confusing flow:** Information in wrong order for learning
- **Missing context:** "Why does this matter?" left unanswered
- **Navigation failures:** Can't find what you need
- **Wall of text:** Too dense to absorb

### Instructions

1. **Read as a learner, not an expert:**
   - Pretend you don't already know v2 concepts
   - Notice when you'd be confused
   - Notice when you'd give up and go watch the video instead

2. **For each doc:**
   - Can you understand it without prior v2 knowledge?
   - Are terms defined before use?
   - Is the "so what?" clear?
   - Could you apply this information?

3. **Navigation check:**
   - Do the headers tell a story when skimmed?
   - Can you find answers to common questions?
   - Is the structure logical for learning (not just for reference)?

4. **Scoring (per doc):**
   - **GREEN:** A motivated learner would succeed with this doc alone.
   - **YELLOW:** Learnable but friction exists. Would benefit from improvements.
   - **RED:** A learner would get stuck or give up. Fails to teach.

### Output Format

Write findings to `REVIEW-FINDINGS-LEARNABILITY.md`:

```markdown
# Learner Advocate Review Findings

## Summary
- Docs reviewed: X/22
- GREEN: X | YELLOW: X | RED: X

## Critical Findings (RED)

### [doc-path.md]
**Problem:** {what blocks learning}
**Where I got stuck:** "{quoted text or section}"
**What I needed:** {what would have helped}
**Suggested fix:** {specific improvement}

## Minor Findings (YELLOW)

### [doc-path.md]
**Friction point:** {what slowed me down}
**Suggested fix:** {improvement}

## Learning Flow Issues
{Any cross-doc issues: wrong order, missing connections, etc.}

## Clean Docs (GREEN)
- [list of docs that teach effectively]
```

### Model Assignment

Use **Sonnet** — analytical, reader-fit focused, doesn't need Opus depth.

---

## Execution Plan

### Step 1: Launch Both Reviewers in Parallel

```
Launch two Task agents simultaneously:
- Agent 1: Source-of-Truth Verifier (Opus)
- Agent 2: Learner Advocate (Sonnet)

Both write findings to the companion site repo.
```

### Step 2: Human Review of Findings

After both complete:
1. Read `REVIEW-FINDINGS-ACCURACY.md`
2. Read `REVIEW-FINDINGS-LEARNABILITY.md`
3. Prioritize: RED items first, then YELLOW
4. Decide what to fix vs what to accept

### Step 3: Fix and Re-verify

For RED items:
1. Make corrections
2. Optionally re-run the affected reviewer on changed docs

---

## Kickoff Prompt (for fresh session)

Use this prompt to start the review in a new session:

```
I want to run an adversarial review of my Agentic Coding v2 companion site.

Read the review plan at ~/git/agentic-coding-v2-companion/REVIEW-PLAN.md

Then launch TWO parallel Task agents:

1. **Source-of-Truth Verifier** (Opus model)
   - Reviews all 22 docs against the v2 course scripts in ~/git/agentic-coding-course/ (v2 branch)
   - Flags inaccuracies, inventions, conflations, oversimplifications
   - Writes findings to REVIEW-FINDINGS-ACCURACY.md in the companion site repo

2. **Learner Advocate** (Sonnet model)
   - Reviews all 22 docs from a learner's perspective
   - Flags undefined terms, assumed knowledge, confusing flow, navigation failures
   - Writes findings to REVIEW-FINDINGS-LEARNABILITY.md in the companion site repo

Run both agents in parallel. When complete, summarize the findings and highlight the most critical issues.
```

---

## Notes

- **Fresh context is intentional:** Each reviewer forms an independent opinion without seeing the other's work
- **Parallel execution:** Both can run simultaneously since they write to different output files
- **Human synthesis:** You review both reports and decide priorities — the agents don't merge findings
- **Iteration optional:** After fixes, you can re-run either reviewer on specific docs

---

# Alternative Review Methods (Optional)

The primary approach above (Source-of-Truth + Learner) was chosen for maximum orthogonality. These alternatives offer different tradeoffs and can be used instead of, or in addition to, the primary approach.

---

## Alternative B: Hostile Expert + Impatient Newcomer

**Tradeoff:** Attacks depth AND surface, but with more adversarial stance than the primary approach.

### Reviewer 1: Hostile Expert

**Persona:** A senior agentic engineer who thinks companion sites are usually wrong. Actively looking for reasons to dismiss.

**Mission:** Find technical errors, weak claims, missing nuance.

**Attack vectors:**
- "This is technically wrong because..."
- "You oversimplified to the point of inaccuracy"
- "This advice would break in production because..."
- "You're missing critical context about X"
- "This worked in v1 but v2 changed Y"

**Model:** Opus

**Output:** `REVIEW-FINDINGS-EXPERT.md`

### Reviewer 2: Impatient Newcomer

**Persona:** Just started the course, skimming docs to get unstuck. Has 5 minutes, not 50.

**Mission:** Can I get what I need fast? Is the structure scannable?

**Attack vectors:**
- "I can't find the answer to X"
- "This is too long — what's the summary?"
- "The headers don't tell me what I'll learn"
- "I skimmed this and still don't know what to do"
- "Where's the quick reference?"

**Model:** Haiku (fast, surface-level, skim-attacks)

**Output:** `REVIEW-FINDINGS-SKIM.md`

**Why different findings:** Expert finds wrong nuances; newcomer finds navigation failures. A doc could be deeply correct but impossible to skim.

---

## Alternative C: Cross-Verification via Multi-Provider

**Tradeoff:** Model diversity finds blindspots, but requires API access to non-Claude models.

**Insight from knowledge base:** In multi-model de-AI editing, GPT-4o pushed back on Claude's over-corrections. Different models literally see text differently — different tokenization, training data, reasoning patterns.

### Reviewer 1: Claude (Opus)

Full adversarial review using standard attack vectors:
- Evidence attacks: "How do you know that?"
- Logic attacks: "You jumped from A to C — what about B?"
- Ambiguity attacks: "What do you mean by 'significant'?"
- Skeptic attacks: "What if the opposite is true?"
- Skim attacks: Do headers alone tell a coherent story?

Scores each doc 1-10; flags anything below 7.

**Output:** `REVIEW-FINDINGS-CLAUDE.md`

### Reviewer 2: GPT-4o (via API or Omnigent)

Same attack vectors, different model perspective.

**Key value:** Catches things Claude misses. May push back on Claude's conclusions.

**Output:** `REVIEW-FINDINGS-GPT4O.md`

**Execution note:** Requires Omnigent or direct OpenAI API access. Could use the hybrid harness if configured.

---

## Alternative D: Editorial Board Adaptation (3 Agents)

**Tradeoff:** More perspectives, but more complex to orchestrate.

**Inspiration from knowledge base:** The Editorial Board uses 6 agents with fresh context per agent, preventing cross-contamination. Adapted here to 3 focused agents for docs review.

| Agent | Perspective | Attack Focus | Model |
|-------|-------------|--------------|-------|
| **Accuracy Auditor** | Course material expert | Claims vs source truth | Opus |
| **Learner Advocate** | First-time reader | Prerequisites, definitions, flow | Sonnet |
| **Structure Critic** | Information architect | Navigation, hierarchy, findability | Sonnet |

### Accuracy Auditor

Same as Reviewer 1 in primary approach. Verifies against v2 source material.

### Learner Advocate

Same as Reviewer 2 in primary approach. Tests learnability.

### Structure Critic (Additional)

**Persona:** An information architect reviewing the site structure.

**Mission:** Is this organized for findability and progressive disclosure?

**Attack vectors:**
- "This information should be in X section, not Y"
- "The hierarchy is wrong — Z is a child of W, not a sibling"
- "These two docs overlap — consolidate or differentiate"
- "The navigation path to find X is too deep"
- "There's no landing page for this concept cluster"

**Output:** `REVIEW-FINDINGS-STRUCTURE.md`

**Board Chair (Optional):** A fourth agent synthesizes all three reports into a prioritized action list.

---

## Alternative E: Adversarial Docs Workflow (Archon)

**Tradeoff:** Full automation with threshold-based retry loop, but requires Archon setup.

**Inspiration from knowledge base:** The `archon-adversarial-docs.yaml` workflow uses a Writer→Attacker loop where sections must score 7/10+ to pass. Failed sections are revised and re-attacked up to 3 times.

**Adaptation for review (not creation):**
- Attacker reviews existing docs against spec
- If any doc scores below threshold, it's flagged for human revision
- No automatic rewrite — human fixes, then re-runs attacker

**Execution:**
```bash
cd ~/git/agentic-coding-v2-companion
archon run adversarial-docs "Review all docs in src/content/docs/ against v2 course accuracy and learnability"
```

**Output:** Archon artifacts directory with attack reports per doc.

---

## Alternative F: Audience Personas (ISV Practitioner + Small Business Owner)

**Tradeoff:** Earlier passes judged content quality in the abstract. This pass tests the site against the two real audiences it serves. Each reviewer arrives with a job to do and reports where the site helps or fails them. The two audiences pull in opposite directions: one wants depth and rationale, the other wants a plain on-ramp. Where both complain about the same page, the problem is clear. Where they disagree, the fix is usually routing (send each reader down their own path), not compromise.

**Success bar:** The site serves both readers through **separate paths**, not by making every page work for everyone.
- Reviewer A judges whether the depth, rationale and migration guidance hold up.
- Reviewer B judges whether the site gives a non-developer **a clear path**: where to start, honest prerequisites, what to skip, and whether this is realistic for them. Reviewer B does **not** fail a deep technical page just for being technical, as long as the site tells them they can skip it.

### Shared Rules (both reviewers)

1. **Work through your tasks first, then sweep.** Attempt each task by navigating the site as your persona would: start at the home page or a likely landing page and follow links and the sidebar. Record the path you took. After the tasks, skim the remaining docs for anything your persona would trip on.
2. **Stay in character.** Only use knowledge your persona would have. Don't fill gaps from your own background.
3. **Every finding needs a quote and a fix.** Quote the exact text (or name the missing thing), say why it fails your persona, and propose a specific change. No generic advice like "add more examples" or "could be clearer".
4. **Name the give-up points.** For each task, say whether you completed it, and if not, the exact page and sentence where you'd close the tab and go back to the videos, ChatGPT or a contractor.
5. **Separate wording fixes from structural ones.** Mark each finding as `wording` (fix in place) or `structure` (needs a new page, a new path, or reorganizing).

### Reviewer A: ISV Practitioner (v1 Alum)

**Persona:** A senior developer or technical founder at a small independent software vendor (ISV) shipping commercial software. They took Cole Medin's v1 course, shipped real work with its patterns (a big CLAUDE.md, custom commands, a PRD-driven workflow), and use Claude Code every day. They're serious about agentic coding and are looking for a solid framework to standardize on across a small team. They're not hostile, but they're skeptical of course material that tells them *what* to do without *why*. Time is money: they'll read deeply when it pays off and skip anything padded.

**Core question:** "Why is this better than what I already do, and what will switching cost me?"

**Tasks:**
1. **Migration plan.** Using `v1-delta/` and anything it links to, write a concrete migration plan for an existing v1-style repo: what to keep, what to change, what to delete, and in what order. Note every step where you had to guess.
2. **The pitch.** Write a three-sentence explanation for a skeptical cofounder of why steering docs + skills + the other primitives beat one large CLAUDE.md. If the site doesn't give you the reasoning, say so.
3. **Production readiness.** Decide whether parallel worktrees and headless/SDK/CI workflows are ready for a team to rely on or still experimental. Find the failure modes and limits the site mentions, and the ones it should mention.
4. **Cost of adoption.** Find what each practice costs: setup time, ongoing upkeep, token or API spend, extra tools (Archon), and the learning curve for teammates.
5. **Framework vs. preference.** Find places where Cole's personal preferences are presented as standard practice, or where the site doesn't separate the core framework from optional tooling.

**What to flag:**
- Claims with no reasoning behind them ("do X" with no "because Y")
- Missing tradeoffs, failure modes or "when not to use this"
- Gaps or ambiguity in the v1 → v2 migration path
- Missing team or production concerns (onboarding teammates, consistency across repos, CI, review)
- Padding, repetition or motivational filler that wastes an expert's time
- Places where the site undersells: a useful insight that's buried or not explained

**Model:** Opus. It needs deep reasoning and comparison against real-world practice.

**Output:** `REVIEW-FINDINGS-ISV.md`

### Reviewer B: Small Business Owner (Non-Developer)

**Persona:** Owns and runs a small business, such as a services firm or a shop with 5–20 employees. No developer background: they've never used git or a terminal beyond copying a command from a tutorial, and words like "CI", "PRD" or "repo" are fuzzy to them. They're genuinely interested in agentic coding and want to build practical tools for their business: an intake form, an inventory tracker, internal automations. They found Cole Medin on YouTube and like his approach, but they won't watch a 9-hour course. They came to this site hoping for clear guidance on how to start. They're smart and motivated, but their time is limited and they get discouraged when a page assumes knowledge they don't have.

**Core question:** "Can I use this to build something for my business, and where do I start?"

**Tasks:**
1. **First steps.** Starting from the home page, work out what to do first, second and third. Write down the order you'd follow. If the site doesn't give you one, say so.
2. **What applies to me.** For a simple internal app (e.g., a customer intake form that saves to a spreadsheet), find which phases, primitives and workflows you need and which you can safely skip.
3. **Minimum setup.** Find the minimum tools, accounts and skills needed to build a first small project. Note every term or tool mentioned without an explanation or link.
4. **Is this for me?** Decide whether this approach is realistic for you, or whether you should hire a developer. Does the site say honestly who it's for and what you need to know first?
5. **Find help.** Pick two terms you didn't understand along the way and try to find them in the glossary or elsewhere on the site. Report whether the explanation worked for you.

**What to flag:**
- No clear "start here" path for a non-developer
- Missing or dishonest prerequisites (assumes git, terminal, coding knowledge without saying so)
- Jargon on **path-critical pages** (home, overviews, anything Reviewer B must read to get started) that isn't explained or linked to the glossary
- No guidance on what's safe to skip
- Missing reassurance or orientation ("you don't need this yet", "this part is for teams")
- Glossary entries that define a term using other undefined jargon

**What not to flag:** Deep technical pages (e.g., `headless-sdk-ci.md`, `parallel-worktrees.md`) for being technical, **unless** the site points you there without warning or doesn't tell you that you can skip them.

**Model:** Sonnet. Strong enough to role-play a non-developer's reasoning consistently and to judge the on-ramp as a whole.

**Output:** `REVIEW-FINDINGS-SMB.md`

### Output Format (both reviewers)

```markdown
# {ISV | Small Business Owner} Review Findings

## Summary
- Tasks completed: X/5
- Docs reviewed: X
- GREEN: X | YELLOW: X | RED: X
- One-paragraph verdict: would this persona adopt/use the site? Why or why not?

## Task Walkthroughs

### Task N: {name}
**Path taken:** home → page → page
**Outcome:** Completed | Partial | Gave up
**Give-up point (if any):** {page + quoted sentence}
**What I needed and didn't find:** {specific}

## Critical Findings (RED)
Blocks the persona from completing a task or leads them to a wrong decision.

### [doc-path.md]
**Quote:** "{exact text}" (or "Missing: {what}")
**Why it fails this persona:** {explanation}
**Type:** wording | structure
**Suggested fix:** {specific change}

## Minor Findings (YELLOW)
Slows the persona down or erodes trust, but they can push through.

### [doc-path.md]
(same fields)

## Structural Recommendations
Paths, pages or reorganizations that would serve this persona better (e.g., a "Start here if you're not a developer" page, a "Why v2" rationale page).

## Clean Docs (GREEN)
- [docs that work well for this persona, with a one-line note on why]
```

### Kickoff Prompt (for fresh session)

```
I want to run the Alternative F audience-persona review of my Agentic Coding v2 companion site.

Read the review plan at ~/git/agentic-coding-v2-companion/REVIEW-PLAN.md, especially "Alternative F".

Then launch TWO parallel Task agents with fresh context. Give each one the full Alternative F text for its reviewer, plus the Shared Rules and Output Format:

1. **Reviewer A: ISV Practitioner (v1 Alum)** (Opus model)
   - Reviews all docs in src/content/docs/ (start the dev server or read the source files)
   - Writes findings to REVIEW-FINDINGS-ISV.md in the companion site repo

2. **Reviewer B: Small Business Owner** (Sonnet model)
   - Reviews all docs in src/content/docs/, judging the on-ramp against the Option 1 success bar
   - Writes findings to REVIEW-FINDINGS-SMB.md in the companion site repo

When both are done, synthesize:
- Problems both personas flagged (fix these first)
- Places where they want opposite things (resolve by routing each reader down their own path, not compromise)
- Structural recommendations ranked by impact
```

### Synthesis Guidance

- **Both flag it:** Fix first. It's a problem for every reader.
- **They conflict:** Prefer routing. Keep the depth for Reviewer A and add a pointer, summary or skip note for Reviewer B, rather than diluting the page.
- **Only A flags it:** Fix in place. Rationale and tradeoffs rarely hurt Reviewer B if they sit in their own section.
- **Only B flags it:** Fix if the page is on B's path. Otherwise, make sure the site tells B they can skip it.

---

## Choosing an Approach

| Approach | Best When | Agents | Models |
|----------|-----------|--------|--------|
| **Primary (A)** | First review pass; want orthogonal accuracy + learnability | 2 | Opus + Sonnet |
| **B: Hostile + Impatient** | Want more adversarial stance; testing surface scannability | 2 | Opus + Haiku |
| **C: Multi-Provider** | Want model diversity; have API access to GPT-4o | 2 | Claude + GPT-4o |
| **D: Editorial Board** | Want structure review too; willing to orchestrate 3 agents | 3 | Opus + 2×Sonnet |
| **E: Archon Workflow** | Want automation; have Archon configured | 1 (looped) | Sonnet |
| **F: Audience Personas** | Want to test the site against its real audiences (ISV practitioner + non-developer business owner) | 2 | Opus + Sonnet |

**Recommended sequence:**
1. Run primary approach (A) first
2. After fixing RED items, optionally run Alternative B or D for additional perspectives
3. Use C (multi-provider) if you suspect Claude has blindspots on specific content

---

## Knowledge Base Sources

These approaches were informed by articles in the memory vault:

- **Editorial Board Multi-Agent Review** (`knowledge/concepts/editorial-board-multi-agent-review.md`)
  - 6 specialized agents with fresh context per agent
  - Veto-driven consensus model
  - Multi-model assignment by cognitive demand

- **Adversarial Review Pattern** (`knowledge/concepts/adversarial-review-pattern.md`)
  - Actively tries to BREAK the artifact
  - Attack vectors: evidence, logic, ambiguity, skeptic, skim
  - Threshold-based scoring (7/10+ to pass)

- **Multi-Model De-AI Editing** (`knowledge/concepts/multi-model-de-ai-editing.md`)
  - Different models have different blindspots
  - GPT-4o pushed back on Claude over-corrections
  - Adversarial tension between models prevents going too far

- **Archon Adversarial Docs Workflow** (`knowledge/templates/documentation-workflows/archon-adversarial-docs.yaml`)
  - Writer→Attacker loop with state machine
  - Section-by-section scoring against spec
  - Max 3 retries per section before flagging
