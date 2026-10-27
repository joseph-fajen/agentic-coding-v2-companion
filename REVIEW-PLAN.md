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

## Choosing an Approach

| Approach | Best When | Agents | Models |
|----------|-----------|--------|--------|
| **Primary (A)** | First review pass; want orthogonal accuracy + learnability | 2 | Opus + Sonnet |
| **B: Hostile + Impatient** | Want more adversarial stance; testing surface scannability | 2 | Opus + Haiku |
| **C: Multi-Provider** | Want model diversity; have API access to GPT-4o | 2 | Claude + GPT-4o |
| **D: Editorial Board** | Want structure review too; willing to orchestrate 3 agents | 3 | Opus + 2×Sonnet |
| **E: Archon Workflow** | Want automation; have Archon configured | 1 (looped) | Sonnet |

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
